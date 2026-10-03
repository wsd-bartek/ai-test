// E-Rechnung-Parser für n8n: XRechnung (UBL/CII), ZUGFeRD 1/2, Factur-X.
// Läuft ohne require() und ohne externe Module, also auch in n8n Cloud.
// Erwartet die globale Funktion tinyInflate (src/tiny-inflate.js) als Fallback für zlib.

var EInvoice = (function () {
  // ---------- Bytes & Text ----------

  function toBytes(input) {
    if (input instanceof Uint8Array) return input;
    if (typeof input === 'string') return new TextEncoder().encode(input);
    return new Uint8Array(input);
  }

  function utf8(bytes) {
    var s = new TextDecoder('utf-8').decode(bytes);
    return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
  }

  function latin1(bytes) {
    var out = '';
    for (var i = 0; i < bytes.length; i += 0x8000) {
      out += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return out;
  }

  // ---------- Inflate (zlib/FlateDecode) ----------

  function inflate(data) {
    try {
      // Self-hosted n8n mit NODE_FUNCTION_ALLOW_BUILTIN=zlib bzw. Node direkt.
      // eslint-disable-next-line no-undef
      var zlib = typeof require === 'function' ? require('zlib') : null;
      if (zlib) return new Uint8Array(zlib.inflateSync(data));
    } catch (e) { /* Fallback auf tinyInflate */ }
    var raw = data;
    // zlib-Header (CMF/FLG) überspringen, tinyInflate erwartet rohes Deflate.
    if (data.length > 2 && (data[0] & 0x0f) === 8 && ((data[0] << 8) | data[1]) % 31 === 0) raw = data.subarray(2);
    var size = Math.max(raw.length * 8, 65536);
    for (var attempt = 0; attempt < 6; attempt++) {
      var out = tinyInflate(raw, new Uint8Array(size));
      if (out.length < size) return out;
      size *= 4;
    }
    throw new Error('Embedded file too large');
  }

  // ---------- PDF: eingebettete XML-Dateien finden ----------

  function extractXmlFromPdf(bytes) {
    var text = latin1(bytes);
    var found = [];
    var re = /(?:^|[^a-z])stream(\r\n|\n|\r)/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      var kwStart = m.index + (m[0].length - m[1].length - 6);
      var dataStart = m.index + m[0].length;
      var objPos = text.lastIndexOf(' obj', kwStart);
      if (objPos < 0) continue;
      var dict = text.slice(objPos, kwStart);
      var isEmbedded = /\/Type\s*\/EmbeddedFile(?![A-Za-z])/.test(dict) || /\/Subtype\s*\/(?:text#2[Ff]xml|application#2[Ff]xml)/.test(dict);
      if (!isEmbedded) {
        var skip = text.indexOf('endstream', dataStart);
        if (skip > 0) re.lastIndex = skip;
        continue;
      }

      var dataEnd = -1;
      var len = /\/Length\s+(\d+)(?!\s+\d+\s+R)/.exec(dict);
      if (len) {
        var candidate = dataStart + parseInt(len[1], 10);
        if (/^\s*endstream/.test(text.substr(candidate, 32))) dataEnd = candidate;
      }
      if (dataEnd < 0) {
        dataEnd = text.indexOf('endstream', dataStart);
        if (dataEnd < 0) continue;
        while (dataEnd > dataStart && (text[dataEnd - 1] === '\n' || text[dataEnd - 1] === '\r')) dataEnd--;
      }

      var chunk = bytes.subarray(dataStart, dataEnd);
      var filter = /\/Filter\s*\[?\s*\/(\w+)/.exec(dict);
      try {
        if (filter && (filter[1] === 'FlateDecode' || filter[1] === 'Fl')) chunk = inflate(chunk);
        else if (filter) continue; // ASCII85/LZW o. Ä. kommen bei ZUGFeRD praktisch nicht vor
        var xml = utf8(chunk).trim();
        if (/^<\?xml|^</.test(xml) && looksLikeInvoice(xml)) found.push(xml);
      } catch (e) { /* defekter oder verschlüsselter Stream, nächsten versuchen */ }
      re.lastIndex = dataEnd;
    }
    return found;
  }

  // Lokaler Name des Wurzelelements (Prolog, Kommentare und DOCTYPE werden übersprungen).
  function rootName(xml) {
    var re = /<(!--[\s\S]*?-->|\?[\s\S]*?\?>|![^>]*>|([\w.-]+:)?([\w.-]+))/g, m;
    while ((m = re.exec(xml)) !== null) if (m[3]) return m[3];
    return '';
  }

  function looksLikeInvoice(xml) {
    return ['CrossIndustryInvoice', 'CrossIndustryDocument', 'Invoice', 'CreditNote'].indexOf(rootName(xml)) >= 0;
  }

  // ---------- Minimaler XML-Parser ----------

  var ENT = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };
  function decodeEntities(s) {
    if (s.indexOf('&') < 0) return s;
    return s.replace(/&(#x[0-9a-fA-F]+|#\d+|\w+);/g, function (all, e) {
      if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
      return ENT[e] !== undefined ? ENT[e] : all;
    });
  }
  function local(name) { var i = name.indexOf(':'); return i < 0 ? name : name.slice(i + 1); }

  function parseXml(xml) {
    var root = { n: '#root', a: {}, c: [], t: '' };
    var stack = [root];
    var i = 0;
    var L = xml.length;
    while (i < L) {
      var lt = xml.indexOf('<', i);
      if (lt < 0) lt = L;
      if (lt > i) stack[stack.length - 1].t += decodeEntities(xml.slice(i, lt));
      if (lt >= L) break;
      if (xml.startsWith('<!--', lt)) { i = xml.indexOf('-->', lt) + 3; if (i < 3) break; continue; }
      if (xml.startsWith('<![CDATA[', lt)) {
        var ce = xml.indexOf(']]>', lt);
        stack[stack.length - 1].t += xml.slice(lt + 9, ce);
        i = ce + 3; continue;
      }
      if (xml[lt + 1] === '?' || xml[lt + 1] === '!') { i = xml.indexOf('>', lt) + 1; if (i === 0) break; continue; }
      var gt = lt + 1, q = null;
      while (gt < L) {
        var ch = xml[gt];
        if (q) { if (ch === q) q = null; } else if (ch === '"' || ch === "'") q = ch; else if (ch === '>') break;
        gt++;
      }
      var tag = xml.slice(lt + 1, gt);
      i = gt + 1;
      if (tag[0] === '/') {
        if (stack.length > 1) stack.pop();
        continue;
      }
      var selfClose = tag[tag.length - 1] === '/';
      if (selfClose) tag = tag.slice(0, -1);
      var sp = tag.search(/\s/);
      var name = sp < 0 ? tag : tag.slice(0, sp);
      var node = { n: local(name), a: {}, c: [], t: '' };
      if (sp >= 0) {
        var ar = /([^\s=]+)\s*=\s*("([^"]*)"|'([^']*)')/g, am;
        var rest = tag.slice(sp);
        while ((am = ar.exec(rest)) !== null) node.a[local(am[1])] = decodeEntities(am[3] !== undefined ? am[3] : am[4]);
      }
      stack[stack.length - 1].c.push(node);
      if (!selfClose) stack.push(node);
    }
    return root.c[0] || null;
  }

  // ---------- Pfad-Helfer ----------

  function all(node, path) {
    if (!node) return [];
    var parts = path.split('/');
    var cur = [node];
    for (var p = 0; p < parts.length; p++) {
      var next = [];
      for (var k = 0; k < cur.length; k++) {
        for (var j = 0; j < cur[k].c.length; j++) if (cur[k].c[j].n === parts[p]) next.push(cur[k].c[j]);
      }
      cur = next;
      if (!cur.length) break;
    }
    return cur;
  }
  function one(node, paths) {
    if (!Array.isArray(paths)) paths = [paths];
    for (var i = 0; i < paths.length; i++) { var r = all(node, paths[i]); if (r.length) return r[0]; }
    return null;
  }
  function txt(node, paths) { var n = one(node, paths); return n ? n.t.trim() : ''; }
  function num(node, paths) { var s = txt(node, paths); return s === '' ? null : round(parseFloat(s)); }
  function round(x) { return isNaN(x) ? null : Math.round(x * 100) / 100; }

  function ciiDate(node, paths) {
    var n = one(node, paths);
    if (!n) return '';
    var s = n.t.trim();
    var f = n.a.format || '102';
    if (f === '102' && /^\d{8}$/.test(s)) return s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6, 8);
    if (f === '610' && /^\d{6}$/.test(s)) return s.slice(0, 4) + '-' + s.slice(4, 6);
    return s;
  }

  // ---------- Normalisierung CII (ZUGFeRD 2 / Factur-X / XRechnung-CII) und ZUGFeRD 1 ----------

  function partyCII(p) {
    if (!p) return null;
    var vat = '', taxNo = '';
    all(p, 'SpecifiedTaxRegistration/ID').forEach(function (n) {
      if (n.a.schemeID === 'VA') vat = n.t.trim(); else if (n.a.schemeID === 'FC') taxNo = n.t.trim();
    });
    return {
      name: txt(p, 'Name'),
      vatId: vat,
      taxNumber: taxNo,
      street: txt(p, 'PostalTradeAddress/LineOne'),
      postcode: txt(p, 'PostalTradeAddress/PostcodeCode'),
      city: txt(p, 'PostalTradeAddress/CityName'),
      country: txt(p, 'PostalTradeAddress/CountryID'),
      email: txt(p, ['DefinedTradeContact/EmailURIUniversalCommunication/URIID', 'URIUniversalCommunication/URIID'])
    };
  }

  function normalizeCII(root) {
    // ZUGFeRD 1.0 (und dessen Entwürfe mit Wurzel "Invoice") nutzen HeaderExchangedDocument.
    var v1 = !!one(root, 'HeaderExchangedDocument');
    var doc = one(root, v1 ? 'HeaderExchangedDocument' : 'ExchangedDocument');
    var tx = one(root, v1 ? 'SpecifiedSupplyChainTradeTransaction' : 'SupplyChainTradeTransaction');
    var agr = one(tx, v1 ? 'ApplicableSupplyChainTradeAgreement' : 'ApplicableHeaderTradeAgreement');
    var stl = one(tx, v1 ? 'ApplicableSupplyChainTradeSettlement' : 'ApplicableHeaderTradeSettlement');
    var dlv = one(tx, v1 ? 'ApplicableSupplyChainTradeDelivery' : 'ApplicableHeaderTradeDelivery');
    var sum = one(stl, v1 ? 'SpecifiedTradeSettlementMonetarySummation' : 'SpecifiedTradeSettlementHeaderMonetarySummation');
    var currency = txt(stl, 'InvoiceCurrencyCode');

    var taxTotal = null;
    all(sum, 'TaxTotalAmount').forEach(function (n) {
      if (taxTotal === null || !n.a.currencyID || n.a.currencyID === currency) taxTotal = round(parseFloat(n.t));
    });

    var pm = one(stl, 'SpecifiedTradeSettlementPaymentMeans');
    var guideline = txt(root, v1 ? 'SpecifiedExchangedDocumentContext/GuidelineSpecifiedDocumentContextParameter/ID'
      : 'ExchangedDocumentContext/GuidelineSpecifiedDocumentContextParameter/ID');

    return {
      syntax: v1 ? 'ZUGFeRD 1.0' : 'CII',
      guideline: guideline,
      number: txt(doc, 'ID'),
      typeCode: txt(doc, 'TypeCode'),
      issueDate: ciiDate(doc, 'IssueDateTime/DateTimeString'),
      dueDate: ciiDate(stl, 'SpecifiedTradePaymentTerms/DueDateDateTime/DateTimeString'),
      deliveryDate: ciiDate(dlv, 'ActualDeliverySupplyChainEvent/OccurrenceDateTime/DateTimeString'),
      currency: currency,
      buyerReference: txt(agr, 'BuyerReference'),
      orderReference: txt(agr, 'BuyerOrderReferencedDocument/IssuerAssignedID'),
      paymentReference: txt(stl, 'PaymentReference'),
      paymentTerms: txt(stl, 'SpecifiedTradePaymentTerms/Description'),
      seller: partyCII(one(agr, 'SellerTradeParty')),
      buyer: partyCII(one(agr, 'BuyerTradeParty')),
      iban: txt(pm, 'PayeePartyCreditorFinancialAccount/IBANID').replace(/\s+/g, ''),
      bic: txt(pm, 'PayeeSpecifiedCreditorFinancialInstitution/BICID'),
      totals: {
        lines: num(sum, 'LineTotalAmount'),
        net: num(sum, 'TaxBasisTotalAmount'),
        tax: taxTotal,
        gross: num(sum, 'GrandTotalAmount'),
        prepaid: num(sum, 'TotalPrepaidAmount'),
        due: num(sum, 'DuePayableAmount')
      },
      vat: all(stl, 'ApplicableTradeTax').map(function (t) {
        return {
          category: txt(t, 'CategoryCode'),
          rate: num(t, ['RateApplicablePercent', 'ApplicablePercent']),
          base: num(t, 'BasisAmount'),
          amount: num(t, 'CalculatedAmount')
        };
      }),
      lines: all(tx, 'IncludedSupplyChainTradeLineItem').map(function (li) {
        var q = one(li, [v1 ? 'SpecifiedSupplyChainTradeDelivery/BilledQuantity' : 'SpecifiedLineTradeDelivery/BilledQuantity']);
        return {
          id: txt(li, 'AssociatedDocumentLineDocument/LineID'),
          name: txt(li, 'SpecifiedTradeProduct/Name'),
          quantity: q ? round(parseFloat(q.t)) : null,
          unit: q ? (q.a.unitCode || '') : '',
          net: num(li, [v1 ? 'SpecifiedSupplyChainTradeSettlement/SpecifiedTradeSettlementMonetarySummation/LineTotalAmount'
            : 'SpecifiedLineTradeSettlement/SpecifiedTradeSettlementLineMonetarySummation/LineTotalAmount']),
          vatRate: num(li, [v1 ? 'SpecifiedSupplyChainTradeSettlement/ApplicableTradeTax/ApplicablePercent'
            : 'SpecifiedLineTradeSettlement/ApplicableTradeTax/RateApplicablePercent'])
        };
      })
    };
  }

  // ---------- Normalisierung UBL (XRechnung-UBL / Peppol) ----------

  function partyUBL(p) {
    if (!p) return null;
    var vat = '';
    all(p, 'PartyTaxScheme').forEach(function (s) {
      var scheme = txt(s, 'TaxScheme/ID');
      if (!vat || scheme === 'VAT') vat = txt(s, 'CompanyID');
    });
    return {
      name: txt(p, ['PartyLegalEntity/RegistrationName', 'PartyName/Name']),
      vatId: vat,
      taxNumber: '',
      street: txt(p, 'PostalAddress/StreetName'),
      postcode: txt(p, 'PostalAddress/PostalZone'),
      city: txt(p, 'PostalAddress/CityName'),
      country: txt(p, 'PostalAddress/Country/IdentificationCode'),
      email: txt(p, 'Contact/ElectronicMail')
    };
  }

  function normalizeUBL(root) {
    var credit = root.n === 'CreditNote';
    var currency = txt(root, 'DocumentCurrencyCode');
    var tot = one(root, 'LegalMonetaryTotal');
    var taxTotal = null;
    all(root, 'TaxTotal').forEach(function (t) {
      var a = one(t, 'TaxAmount');
      if (a && (taxTotal === null || a.a.currencyID === currency)) taxTotal = round(parseFloat(a.t));
    });
    var pm = one(root, 'PaymentMeans');
    return {
      syntax: 'UBL',
      guideline: txt(root, 'CustomizationID'),
      number: txt(root, 'ID'),
      typeCode: txt(root, credit ? 'CreditNoteTypeCode' : 'InvoiceTypeCode'),
      issueDate: txt(root, 'IssueDate'),
      dueDate: txt(root, ['DueDate', 'PaymentMeans/PaymentDueDate']),
      deliveryDate: txt(root, 'Delivery/ActualDeliveryDate'),
      currency: currency,
      buyerReference: txt(root, 'BuyerReference'),
      orderReference: txt(root, 'OrderReference/ID'),
      paymentReference: txt(pm, 'PaymentID'),
      paymentTerms: txt(root, 'PaymentTerms/Note'),
      seller: partyUBL(one(root, 'AccountingSupplierParty/Party')),
      buyer: partyUBL(one(root, 'AccountingCustomerParty/Party')),
      iban: txt(pm, 'PayeeFinancialAccount/ID').replace(/\s+/g, ''),
      bic: txt(pm, 'PayeeFinancialAccount/FinancialInstitutionBranch/ID'),
      totals: {
        lines: num(tot, 'LineExtensionAmount'),
        net: num(tot, 'TaxExclusiveAmount'),
        tax: taxTotal,
        gross: num(tot, 'TaxInclusiveAmount'),
        prepaid: num(tot, 'PrepaidAmount'),
        due: num(tot, 'PayableAmount')
      },
      vat: all(root, 'TaxTotal/TaxSubtotal').map(function (s) {
        return {
          category: txt(s, 'TaxCategory/ID'),
          rate: num(s, 'TaxCategory/Percent'),
          base: num(s, 'TaxableAmount'),
          amount: num(s, 'TaxAmount')
        };
      }),
      lines: all(root, credit ? 'CreditNoteLine' : 'InvoiceLine').map(function (li) {
        var q = one(li, credit ? 'CreditedQuantity' : 'InvoicedQuantity');
        return {
          id: txt(li, 'ID'),
          name: txt(li, 'Item/Name'),
          quantity: q ? round(parseFloat(q.t)) : null,
          unit: q ? (q.a.unitCode || '') : '',
          net: num(li, 'LineExtensionAmount'),
          vatRate: num(li, 'Item/ClassifiedTaxCategory/Percent')
        };
      })
    };
  }

  // ---------- Format-Bezeichnung & Plausibilität ----------

  function formatLabel(inv, fromPdf) {
    var g = (inv.guideline || '').toLowerCase();
    if (inv.syntax === 'ZUGFeRD 1.0') return 'ZUGFeRD 1.0';
    if (g.indexOf('xrechnung') >= 0) return (fromPdf ? 'ZUGFeRD/XRechnung' : 'XRechnung') + ' (' + inv.syntax + ')';
    if (inv.syntax === 'UBL') return g.indexOf('peppol') >= 0 ? 'Peppol BIS (UBL)' : 'UBL (EN 16931)';
    var profile = 'EN 16931';
    if (/minimum/.test(g)) profile = 'MINIMUM';
    else if (/basicwl/.test(g)) profile = 'BASIC WL';
    else if (/basic/.test(g)) profile = 'BASIC';
    else if (/extended/.test(g)) profile = 'EXTENDED';
    return (fromPdf ? 'ZUGFeRD/Factur-X ' : 'CII ') + profile;
  }

  function checks(inv) {
    var notes = [];
    var t = inv.totals;
    if (!inv.number) notes.push('Rechnungsnummer fehlt');
    if (!inv.issueDate) notes.push('Rechnungsdatum fehlt');
    if (!inv.seller || !inv.seller.name) notes.push('Verkäufer fehlt');
    if (t.due === null && t.gross === null) notes.push('Kein Zahl- bzw. Bruttobetrag');
    if (t.net !== null && t.tax !== null && t.gross !== null && Math.abs(t.net + t.tax - t.gross) > 0.011) {
      notes.push('Netto + USt ≠ Brutto (' + t.net + ' + ' + t.tax + ' ≠ ' + t.gross + ')');
    }
    if (inv.vat.length && t.tax !== null) {
      var s = inv.vat.reduce(function (a, v) { return a + (v.amount || 0); }, 0);
      if (Math.abs(s - t.tax) > 0.011 * inv.vat.length) notes.push('Summe der USt-Positionen ≠ USt gesamt');
    }
    return notes;
  }

  function typeLabel(code) {
    return { '380': 'Rechnung', '381': 'Gutschrift', '384': 'Rechnungskorrektur', '389': 'Selbstfakturierte Rechnung', '326': 'Teilrechnung', '875': 'Teilschlussrechnung', '876': 'Teilrechnung (Bau)', '877': 'Schlussrechnung' }[code] || code;
  }

  // ---------- Ausgaben: Tabellenzeile & HTML ----------

  function sheetRow(inv, meta) {
    var s = inv.seller || {}, t = inv.totals;
    return {
      'Eingang': meta.receivedAt || '',
      'Datei': meta.fileName || '',
      'Format': inv.format,
      'Belegart': typeLabel(inv.typeCode),
      'Rechnungsnummer': inv.number,
      'Rechnungsdatum': inv.issueDate,
      'Fällig am': inv.dueDate,
      'Lieferant': s.name || '',
      'USt-IdNr. Lieferant': s.vatId || s.taxNumber || '',
      'Käuferreferenz / Leitweg-ID': inv.buyerReference,
      'Bestellnummer': inv.orderReference,
      'Netto': t.net,
      'USt': t.tax,
      'Brutto': t.gross,
      'Zahlbetrag': t.due !== null ? t.due : t.gross,
      'Währung': inv.currency,
      'IBAN': inv.iban,
      'Verwendungszweck': inv.paymentReference || inv.number,
      'Plausibel': inv.plausible ? 'ja' : 'nein',
      'Hinweise': inv.notes.join('; ')
    };
  }

  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function money(x, cur) {
    if (x === null || x === undefined) return '';
    return x.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + (cur || '');
  }

  function html(inv) {
    var s = inv.seller || {}, b = inv.buyer || {}, t = inv.totals, c = inv.currency;
    var td = 'style="padding:4px 8px;border-bottom:1px solid #ddd"';
    var rows = inv.lines.map(function (l) {
      return '<tr><td ' + td + '>' + esc(l.id) + '</td><td ' + td + '>' + esc(l.name) + '</td><td ' + td + ' align="right">' +
        esc(l.quantity) + ' ' + esc(l.unit) + '</td><td ' + td + ' align="right">' + esc(money(l.net, c)) + '</td></tr>';
    }).join('');
    return '<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">' +
      '<h2 style="margin:0 0 4px">' + esc(typeLabel(inv.typeCode)) + ' ' + esc(inv.number) + '</h2>' +
      '<p style="margin:0 0 12px;color:#555">' + esc(inv.format) + (inv.plausible ? '' : ' · <b style="color:#b00">Bitte prüfen: ' + esc(inv.notes.join('; ')) + '</b>') + '</p>' +
      '<table cellspacing="0" style="border-collapse:collapse;margin-bottom:12px">' +
      '<tr><td ' + td + '><b>Lieferant</b></td><td ' + td + '>' + esc(s.name) + '<br>' + esc([s.street, [s.postcode, s.city].join(' '), s.country].filter(Boolean).join(', ')) + (s.vatId ? '<br>USt-IdNr. ' + esc(s.vatId) : '') + '</td></tr>' +
      '<tr><td ' + td + '><b>Empfänger</b></td><td ' + td + '>' + esc(b.name) + (inv.buyerReference ? '<br>Referenz: ' + esc(inv.buyerReference) : '') + '</td></tr>' +
      '<tr><td ' + td + '><b>Rechnungsdatum</b></td><td ' + td + '>' + esc(inv.issueDate) + '</td></tr>' +
      '<tr><td ' + td + '><b>Fällig</b></td><td ' + td + '>' + esc(inv.dueDate || inv.paymentTerms) + '</td></tr>' +
      '<tr><td ' + td + '><b>Netto / USt / Brutto</b></td><td ' + td + '>' + esc(money(t.net, c)) + ' / ' + esc(money(t.tax, c)) + ' / ' + esc(money(t.gross, c)) + '</td></tr>' +
      '<tr><td ' + td + '><b>Zahlbetrag</b></td><td ' + td + '><b>' + esc(money(t.due !== null ? t.due : t.gross, c)) + '</b></td></tr>' +
      '<tr><td ' + td + '><b>IBAN</b></td><td ' + td + '>' + esc(inv.iban) + (inv.bic ? ' (' + esc(inv.bic) + ')' : '') + '</td></tr>' +
      '<tr><td ' + td + '><b>Verwendungszweck</b></td><td ' + td + '>' + esc(inv.paymentReference || inv.number) + '</td></tr>' +
      '</table>' +
      (rows ? '<table cellspacing="0" style="border-collapse:collapse"><tr><th ' + td + ' align="left">Pos.</th><th ' + td + ' align="left">Bezeichnung</th><th ' + td + ' align="right">Menge</th><th ' + td + ' align="right">Netto</th></tr>' + rows + '</table>' : '') +
      '</div>';
  }

  // ---------- Öffentliche API ----------

  function parseInvoiceXml(xml, fromPdf) {
    var root = parseXml(xml);
    if (!root) throw new Error('Kein gültiges XML');
    var inv;
    if (root.n === 'CrossIndustryInvoice' || root.n === 'CrossIndustryDocument' || one(root, 'HeaderExchangedDocument')) inv = normalizeCII(root);
    else if (root.n === 'Invoice' || root.n === 'CreditNote') inv = normalizeUBL(root);
    else throw new Error('Unbekanntes XML-Format: ' + root.n);
    inv.format = formatLabel(inv, fromPdf);
    inv.notes = checks(inv);
    inv.plausible = inv.notes.length === 0;
    return inv;
  }

  // input: Bytes einer .xml- oder .pdf-Datei
  function fromFile(input, fileName, meta) {
    var bytes = toBytes(input);
    meta = meta || {};
    meta.fileName = fileName || meta.fileName || '';
    var isPdf = latin1(bytes.subarray(0, 1024)).indexOf('%PDF') >= 0;
    var xmls;
    if (isPdf) {
      xmls = extractXmlFromPdf(bytes);
      if (!xmls.length) return { ok: false, reason: 'PDF ohne eingebettete E-Rechnung (normale PDF-Rechnung)' };
    } else {
      var s = utf8(bytes).trim();
      if (!looksLikeInvoice(s)) return { ok: false, reason: 'XML ist keine E-Rechnung' };
      xmls = [s];
    }
    try {
      var inv = parseInvoiceXml(xmls[0], isPdf);
      return { ok: true, invoice: inv, row: sheetRow(inv, meta), html: html(inv) };
    } catch (e) {
      return { ok: false, reason: 'E-Rechnung konnte nicht gelesen werden: ' + e.message };
    }
  }

  return { fromFile: fromFile, parseInvoiceXml: parseInvoiceXml, extractXmlFromPdf: extractXmlFromPdf, parseXml: parseXml };
})();
