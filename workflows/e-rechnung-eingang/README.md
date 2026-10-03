# E-Rechnung-Eingang automatisieren (n8n)

**XRechnung (UBL & CII) · ZUGFeRD 1.0 / 2.x · Factur-X: automatisch aus dem Postfach auslesen**

Seit dem 1.1.2025 müssen Unternehmen in Deutschland E-Rechnungen empfangen können. Dieser n8n-Workflow übernimmt die Verarbeitung:

```
Postfach (IMAP) → E-Rechnung erkennen & auslesen → Ist E-Rechnung?
                                                     ├─ ja  → Zeile ins Google Sheet
                                                     │      → Original in Google Drive (sprechender Dateiname)
                                                     │      → Zusammenfassung per E-Mail (lesbare Ansicht + Original im Anhang)
                                                     └─ nein → ignorieren (normale PDF-Rechnungen, sonstige Anhänge)
```

## Was ausgelesen wird

Format, Belegart, Rechnungsnummer, Rechnungs-, Fälligkeits- und Lieferdatum, Lieferant (Name, Adresse, USt-IdNr.), Empfänger, Käuferreferenz bzw. Leitweg-ID, Bestellnummer, Netto, USt, Brutto, Zahlbetrag, Währung, IBAN/BIC, Verwendungszweck, USt-Aufschlüsselung und Rechnungspositionen.

Dazu kommt eine **Plausibilitätsprüfung** (Pflichtfelder vorhanden? Netto + USt = Brutto? Summe der USt-Positionen stimmt?). Auffällige Rechnungen werden in der Tabelle und im Betreff markiert.

## Getestet

Der Parser wurde gegen **240 offizielle Testrechnungen** geprüft: die [KoSIT XRechnung-Testsuite](https://github.com/itplr-kosit/xrechnung-testsuite) und den [ZUGFeRD-Corpus](https://github.com/ZUGFeRD/corpus).

| | |
|---|---|
| Gelesen | **240 / 240** |
| Plausibel | 237 |

Die 3 Ausnahmen sind beabsichtigt: zwei ZUGFeRD-Entwürfe von 2014 ohne Rechnungsdatum und eine absichtlich fehlerhafte Testdatei, die korrekt als „bitte prüfen“ markiert wird.

Zusätzlich lief der komplette Workflow Ende-zu-Ende in **n8n 2.41.6**: echte Code-Node-Sandbox (Task Runner), Binärdaten im Filesystem-Modus.

```bash
node test/run-tests.js <pfad>/xrechnung-testsuite <pfad>/zugferd-corpus
```

## Einrichtung (ca. 10 Minuten)

1. **Workflow importieren:** In n8n auf *Workflows → Import from File* gehen und `e-rechnung-eingang.json` wählen.
2. **Postfach:** IMAP-Zugangsdaten im Node *Postfach* hinterlegen. Ein eigenes Rechnungspostfach (z. B. `rechnungen@…`) ist empfohlen. Standardmäßig werden ungelesene Mails verarbeitet und danach als gelesen markiert.
3. **Google Sheet** mit dieser Kopfzeile anlegen und im Node *In Tabelle eintragen* auswählen:
   ```
   Eingang | Datei | Format | Belegart | Rechnungsnummer | Rechnungsdatum | Fällig am | Lieferant | USt-IdNr. Lieferant | Käuferreferenz / Leitweg-ID | Bestellnummer | Netto | USt | Brutto | Zahlbetrag | Währung | IBAN | Verwendungszweck | Plausibel | Hinweise
   ```
4. **Archiv:** Im Node *Original archivieren* einen Google-Drive-Ordner wählen.
5. **Zusammenfassung:** Im Node *Zusammenfassung senden* Absender, Empfänger und SMTP-Zugang setzen.
6. **Aktivieren.**

Statt Google lassen sich auch andere Ziele anbinden: lexoffice, sevDesk, DATEV-CSV, Excel/OneDrive, Slack/Teams, Paperless-ngx und andere. Dafür werden die Ziel-Nodes ausgetauscht, der Parser bleibt gleich.

## Technik

- Der Parser steckt komplett im Code-Node. Er braucht **keine externen Module** und läuft deshalb auch in **n8n Cloud**.
- Bei ZUGFeRD/Factur-X wird die eingebettete XML aus der PDF extrahiert. Dafür nutzt der Code zlib, falls verfügbar, sonst eine eingebettete Inflate-Implementierung ([tiny-inflate](https://github.com/foliojs/tiny-inflate), MIT).
- Quellcode: `src/einvoice.js` (Parser), `src/n8n-glue.js` (n8n-Anbindung). Der Workflow wird mit `node build.js` neu gebaut.

## Grenzen

- Das ist **keine vollständige EN-16931-Validierung**. Für eine formale Prüfung gibt es den [KoSIT-Validator](https://github.com/itplr-kosit/validator).
- Verschlüsselte PDFs werden nicht gelesen.
- Technische Lösung, **keine Steuerberatung**.

---

## English

n8n workflow that pulls EU e-invoices (XRechnung UBL/CII, ZUGFeRD 1/2, Factur-X) from an IMAP inbox, extracts all key fields with a dependency-free parser (works on n8n Cloud), logs them to Google Sheets, archives the original in Google Drive and emails a readable summary. Tested against 240 official sample invoices (240/240 parsed).

---

**Du willst das angepasst haben,** z. B. für lexoffice, sevDesk oder DATEV, mit Freigabe-Workflow oder für den Rechnungsausgang? → **[Nodewise: n8n-Automatisierungen zum Festpreis](https://wsd-bartek.github.io/ai-test/)**

Lizenz: MIT (`LICENSE`). Enthält tiny-inflate © Devon Govett, MIT (`src/LICENSE-tiny-inflate`).
