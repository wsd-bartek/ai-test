// Baut aus src/ den importierbaren n8n-Workflow (e-rechnung-eingang.json)
// und einen Test-Workflow (test/test-workflow.json), der Dateien von der Festplatte liest.
// Aufruf: node build.js [testDateiGlob]
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, 'src', f), 'utf8');
const jsCode = [
  '// Wowora E-Rechnung-Parser: XRechnung (UBL/CII), ZUGFeRD 1/2, Factur-X',
  '// Quelle & Tests: https://github.com/wsd-bartek/ai-test/tree/claude/pensive-fermat-5pqh31/workflows/e-rechnung-eingang',
  read('tiny-inflate.js'),
  read('einvoice.js'),
  read('n8n-glue.js'),
].join('\n');

const id = seed => crypto.createHash('md5').update(seed).digest('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12}).*$/, '$1-$2-$3-$4-$5');

const parserNode = (pos) => ({
  parameters: { mode: 'runOnceForAllItems', language: 'javaScript', jsCode },
  id: id('parser'),
  name: 'E-Rechnung erkennen & auslesen',
  type: 'n8n-nodes-base.code',
  typeVersion: 2,
  position: pos,
});

const ifNode = (pos) => ({
  parameters: {
    conditions: {
      options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 3 },
      conditions: [{
        id: id('cond'),
        leftValue: '={{ $json.isEInvoice }}',
        rightValue: '',
        operator: { type: 'boolean', operation: 'true', singleValue: true },
      }],
      combinator: 'and',
    },
    options: {},
  },
  id: id('if'),
  name: 'Ist E-Rechnung?',
  type: 'n8n-nodes-base.if',
  typeVersion: 2.3,
  position: pos,
});

const rowNode = (pos) => ({
  parameters: {
    mode: 'runOnceForAllItems',
    language: 'javaScript',
    jsCode: '// Nur die Tabellenspalten weitergeben (Spaltennamen = Kopfzeile im Google Sheet)\nreturn $input.all().map(item => ({ json: item.json.row }));',
  },
  id: id('row'),
  name: 'Tabellenzeile',
  type: 'n8n-nodes-base.code',
  typeVersion: 2,
  position: pos,
});

// ---------- Produktions-Workflow ----------
const prod = {
  name: 'E-Rechnung-Eingang automatisch verarbeiten (XRechnung / ZUGFeRD) – Wowora',
  nodes: [
    {
      parameters: {
        content: '## E-Rechnung-Eingang automatisiert\n\n**Was passiert:** Neue E-Mails im Postfach → XML- und PDF-Anhänge prüfen → E-Rechnungen (XRechnung UBL/CII, ZUGFeRD 1/2, Factur-X) auslesen → Zeile ins Google Sheet, Original in Google Drive, Zusammenfassung per Mail.\n\n**Einrichtung (ca. 10 Min.):**\n1. IMAP-Zugang im Node *Postfach* hinterlegen (eigenes Rechnungspostfach empfohlen).\n2. Google Sheet mit Kopfzeile anlegen (Spalten siehe README) und im Node *In Tabelle eintragen* auswählen.\n3. Ordner im Node *Original archivieren* wählen.\n4. Absender/Empfänger im Node *Zusammenfassung senden* setzen.\n\nDer Parser läuft ohne externe Module, also auch in **n8n Cloud**.\nKeine Steuerberatung: Die Plausibilitätsprüfung ersetzt keine vollständige Validierung.\n\nGebaut von **Wowora**: n8n-Automatisierungen zum Festpreis\nhttps://wowora.de/',
        height: 520,
        width: 420,
      },
      id: id('sticky'),
      name: 'Anleitung',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-520, -200],
    },
    {
      parameters: {
        mailbox: 'INBOX',
        postProcessAction: 'read',
        format: 'simple',
        downloadAttachments: true,
        options: {},
      },
      id: id('imap'),
      name: 'Postfach',
      type: 'n8n-nodes-base.emailReadImap',
      typeVersion: 2.2,
      position: [0, 0],
    },
    parserNode([240, 0]),
    ifNode([480, 0]),
    rowNode([740, -200]),
    {
      parameters: {
        resource: 'sheet',
        operation: 'append',
        documentId: { __rl: true, mode: 'url', value: '' },
        sheetName: { __rl: true, mode: 'list', value: '' },
        columns: { mappingMode: 'autoMapInputData', value: {}, matchingColumns: [], schema: [] },
        options: {},
      },
      id: id('sheets'),
      name: 'In Tabelle eintragen',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [980, -200],
    },
    {
      parameters: {
        inputDataFieldName: 'invoice',
        name: '={{ $json.archiveName }}',
        driveId: { __rl: true, mode: 'list', value: 'My Drive' },
        folderId: { __rl: true, mode: 'list', value: 'root', cachedResultName: '/ (Root folder)' },
        options: {},
      },
      id: id('drive'),
      name: 'Original archivieren',
      type: 'n8n-nodes-base.googleDrive',
      typeVersion: 3,
      position: [740, 0],
    },
    {
      parameters: {
        fromEmail: '',
        toEmail: '',
        subject: "=E-Rechnung {{ $json.row['Rechnungsnummer'] }} von {{ $json.row['Lieferant'] }}: {{ $json.row['Zahlbetrag'] }} {{ $json.row['Währung'] }}{{ $json.invoice.plausible ? '' : ' (bitte prüfen)' }}",
        emailFormat: 'html',
        html: '={{ $json.html }}',
        options: { attachments: 'invoice' },
      },
      id: id('mail'),
      name: 'Zusammenfassung senden',
      type: 'n8n-nodes-base.emailSend',
      typeVersion: 2.1,
      position: [740, 200],
    },
    {
      parameters: {},
      id: id('noop'),
      name: 'Keine E-Rechnung (ignorieren)',
      type: 'n8n-nodes-base.noOp',
      typeVersion: 1,
      position: [740, 400],
    },
  ],
  connections: {
    'Postfach': { main: [[{ node: 'E-Rechnung erkennen & auslesen', type: 'main', index: 0 }]] },
    'E-Rechnung erkennen & auslesen': { main: [[{ node: 'Ist E-Rechnung?', type: 'main', index: 0 }]] },
    'Ist E-Rechnung?': {
      main: [
        [
          { node: 'Tabellenzeile', type: 'main', index: 0 },
          { node: 'Original archivieren', type: 'main', index: 0 },
          { node: 'Zusammenfassung senden', type: 'main', index: 0 },
        ],
        [{ node: 'Keine E-Rechnung (ignorieren)', type: 'main', index: 0 }],
      ],
    },
    'Tabellenzeile': { main: [[{ node: 'In Tabelle eintragen', type: 'main', index: 0 }]] },
  },
  settings: { executionOrder: 'v1' },
  pinData: {},
};

fs.writeFileSync(path.join(dir, 'e-rechnung-eingang.json'), JSON.stringify(prod, null, 2) + '\n');

// ---------- Test-Workflow (lokal, Dateien statt Postfach) ----------
const glob = process.argv[2] || '/tmp/einvoice-test/*';
const test = {
  id: 'woworaEInvoiceTest',
  name: 'TEST E-Rechnung Parser',
  nodes: [
    { parameters: {}, id: id('t-trigger'), name: 'Start', type: 'n8n-nodes-base.manualTrigger', typeVersion: 1, position: [0, 0] },
    {
      parameters: { fileSelector: glob, options: {} },
      id: id('t-read'), name: 'Dateien lesen', type: 'n8n-nodes-base.readWriteFile', typeVersion: 1.1, position: [220, 0],
    },
    {
      // Simuliert ein E-Mail-Item mit mehreren Anhängen (wie der IMAP-Node).
      parameters: {
        mode: 'runOnceForAllItems', language: 'javaScript',
        jsCode: "const binary = {};\n$input.all().forEach((it, i) => { binary['attachment_' + i] = it.binary.data; });\nreturn [{ json: { from: 'Test <test@example.com>', subject: 'Rechnungen', date: '2026-10-02T09:00:00Z' }, binary }];",
      },
      id: id('t-merge'), name: 'Als E-Mail bündeln', type: 'n8n-nodes-base.code', typeVersion: 2, position: [440, 0],
    },
    parserNode([660, 0]),
    ifNode([880, 0]),
    rowNode([1100, -100]),
    { parameters: {}, id: id('t-no'), name: 'Keine E-Rechnung', type: 'n8n-nodes-base.noOp', typeVersion: 1, position: [1100, 100] },
  ],
  connections: {
    'Start': { main: [[{ node: 'Dateien lesen', type: 'main', index: 0 }]] },
    'Dateien lesen': { main: [[{ node: 'Als E-Mail bündeln', type: 'main', index: 0 }]] },
    'Als E-Mail bündeln': { main: [[{ node: 'E-Rechnung erkennen & auslesen', type: 'main', index: 0 }]] },
    'E-Rechnung erkennen & auslesen': { main: [[{ node: 'Ist E-Rechnung?', type: 'main', index: 0 }]] },
    'Ist E-Rechnung?': { main: [[{ node: 'Tabellenzeile', type: 'main', index: 0 }], [{ node: 'Keine E-Rechnung', type: 'main', index: 0 }]] },
  },
  settings: { executionOrder: 'v1' },
  active: false,
};
fs.writeFileSync(path.join(dir, 'test', 'test-workflow.json'), JSON.stringify(test, null, 2) + '\n');
console.log('built: e-rechnung-eingang.json (' + jsCode.length + ' chars code), test/test-workflow.json (glob ' + glob + ')');
