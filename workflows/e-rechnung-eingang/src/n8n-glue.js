// ---------- n8n: Anhänge aller Eingangs-Items durchgehen ----------
// Modus "Run Once for All Items". Jede XML- oder PDF-Datei wird ein eigenes Ausgangs-Item:
//   isEInvoice = true:  json.row (Tabellenzeile), json.invoice (alle Felder), json.html (Ansicht), binary.invoice (Original)
//   isEInvoice = false: json.reason (warum nicht), binary.file (Original)
const out = [];
const items = $input.all();

function mailInfo(j) {
  const from = j.from && typeof j.from === 'object' ? (j.from.text || (j.from.value && j.from.value[0] && j.from.value[0].address) || '') : (j.from || '');
  return { from: from, subject: j.subject || '', date: j.date || '' };
}

function isoDay(d) {
  const t = d ? new Date(d) : new Date();
  return isNaN(t.getTime()) ? new Date().toISOString().slice(0, 10) : t.toISOString().slice(0, 10);
}

for (let i = 0; i < items.length; i++) {
  const binary = items[i].binary || {};
  const mail = mailInfo(items[i].json || {});
  for (const key of Object.keys(binary)) {
    const meta = binary[key];
    const name = meta.fileName || key;
    if (!/\.(xml|pdf)$/i.test(name) && !/xml|pdf/i.test(meta.mimeType || '')) continue;

    const buffer = await this.helpers.getBinaryDataBuffer(i, key);
    const res = EInvoice.fromFile(new Uint8Array(buffer), name, { receivedAt: isoDay(mail.date) });

    if (res.ok) {
      const ext = (name.match(/\.(\w+)$/) || ['', 'xml'])[1].toLowerCase();
      const archiveName = [res.row['Rechnungsdatum'], res.row['Lieferant'], res.row['Rechnungsnummer']]
        .filter(Boolean).join('_').replace(/[\\/:*?"<>|\s]+/g, '_').slice(0, 120) + '.' + ext;
      out.push({
        json: { isEInvoice: true, row: res.row, invoice: res.invoice, html: res.html, archiveName: archiveName, mail: mail },
        binary: { invoice: meta },
        pairedItem: { item: i }
      });
    } else {
      out.push({
        json: { isEInvoice: false, fileName: name, reason: res.reason, mail: mail },
        binary: { file: meta },
        pairedItem: { item: i }
      });
    }
  }
}

return out;
