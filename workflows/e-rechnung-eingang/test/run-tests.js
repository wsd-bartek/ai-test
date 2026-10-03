// Testet den Parser gegen die offiziellen Testdateien:
//   XRechnung:   https://github.com/itplr-kosit/xrechnung-testsuite
//   ZUGFeRD:     https://github.com/ZUGFeRD/corpus
// Aufruf: node test/run-tests.js <pfad-testsuite> <pfad-corpus>
// Läuft zweimal: mit zlib (self-hosted) und ohne require (wie n8n Cloud).
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const src = ['tiny-inflate.js', 'einvoice.js'].map(f => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8')).join('\n');

function load(withRequire) {
  const ctx = { TextDecoder, TextEncoder, Uint8Array, Uint16Array, console };
  if (withRequire) ctx.require = require;
  vm.createContext(ctx);
  vm.runInContext(src + '\nthis.EInvoice = EInvoice;', ctx);
  return ctx.EInvoice;
}

function walk(dir, exts, out = []) {
  if (!dir || !fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '.git') walk(p, exts, out); }
    else if (exts.includes(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

const [suite, corpus] = process.argv.slice(2);
const files = [
  ...walk(suite && path.join(suite, 'src/test'), ['.xml']).map(f => ({ f, expect: 'xml' })),
  ...walk(corpus && path.join(corpus, 'ZUGFeRDv2/correct'), ['.pdf']).map(f => ({ f, expect: 'pdf' })),
  ...walk(corpus && path.join(corpus, 'ZUGFeRDv1/correct'), ['.pdf']).map(f => ({ f, expect: 'pdf' })),
  ...walk(corpus && path.join(corpus, 'XML-Rechnung'), ['.xml']).map(f => ({ f, expect: 'xml' })),
];

let exitCode = 0;
for (const mode of [true, false]) {
  const E = load(mode);
  const stats = { ok: 0, plausible: 0, noEmbedded: 0, failed: 0, slow: 0 };
  const problems = [];
  for (const { f } of files) {
    const bytes = fs.readFileSync(f);
    if (bytes.length < 200) continue; // LFS-Pointer o. Ä.
    const t0 = Date.now();
    const r = E.fromFile(new Uint8Array(bytes), path.basename(f), { receivedAt: '2026-10-02' });
    if (Date.now() - t0 > 2000) stats.slow++;
    if (r.ok) {
      stats.ok++;
      if (r.invoice.plausible) stats.plausible++; else problems.push(`${path.relative(process.cwd(), f)}: ${r.invoice.notes.join('; ')}`);
      if (!r.invoice.number || r.row.Zahlbetrag === null) { problems.push(`${f}: Kernfelder fehlen`); }
    } else if (/eingebettete/.test(r.reason)) { stats.noEmbedded++; problems.push(`${path.basename(f)}: ${r.reason}`); }
    else { stats.failed++; problems.push(`${path.basename(f)}: ${r.reason}`); }
  }
  console.log(`\n=== Modus: ${mode ? 'mit zlib (self-hosted)' : 'ohne require (n8n Cloud)'} ===`);
  console.log(`Dateien: ${files.length} | gelesen: ${stats.ok} | plausibel: ${stats.plausible} | PDF ohne XML: ${stats.noEmbedded} | Fehler: ${stats.failed} | >2s: ${stats.slow}`);
  if (process.env.VERBOSE) problems.forEach(p => console.log('  - ' + p));
  else problems.slice(0, 15).forEach(p => console.log('  - ' + p));
  if (stats.failed) exitCode = 1;
}
process.exit(exitCode);
