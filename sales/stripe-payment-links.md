# Stripe Payment Links: genaue Anleitung (ca. 10 Min.)

So legst du die Links an: im Stripe-Dashboard (WSD-Account) auf **Produktkatalog → Produkt hinzufügen**, danach **Payment Links → Neu**.
Für jedes der 4 Pakete einmal. Danach schickst du mir die 4 Links, und ich trage sie in `docs/assets/config.js` ein.

| Schlüssel | Produktname | Preis (einmalig) | Beschreibung (Kurztext) |
|---|---|---|---|
| `fix` | Nodewise Workflow-Fix | 99 € | Reparatur bzw. Debugging eines bestehenden n8n-Workflows (1 Workflow, 1 Problem). Lieferung in 24–48 h. |
| `starter` | Nodewise Starter-Automatisierung | 290 € | 1 neuer n8n-Workflow (bis 3 Apps) inkl. Doku, 30-Min-Übergabe und 14 Tagen Fixes. Lieferung in 3 Werktagen. |
| `erechnung` | Nodewise E-Rechnung-Eingang | 490 € | Automatische Verarbeitung eingehender XRechnung/ZUGFeRD-Rechnungen aus dem Postfach inkl. Export und Archiv. Lieferung in 5 Werktagen. |
| `sprint` | Nodewise Automatisierungs-Sprint | 890 € | Bis zu 3 n8n-Workflows oder 1 KI-Agent-Workflow inkl. Doku, Übergabe und 30 Tagen Support. Lieferung in 5 Werktagen. |

**Preise und Steuern:**
- Die Website zeigt Nettopreise.
- Bist du **regelbesteuert**: Brutto anlegen (99 → 117,81 €, 290 → 345,10 €, 490 → 583,10 €, 890 → 1.059,10 €), oder den Preis netto anlegen und Stripe Tax die USt. aufschlagen lassen (Stripe Tax ist kostenpflichtig, daher besser brutto).
- Bist du **Kleinunternehmer**: Die Beträge oben 1:1 übernehmen und mir Bescheid geben. Dann passe ich den Hinweis auf der Website an.

**Einstellungen pro Link:**
- [ ] **Nach der Zahlung → Bestätigungsseite: Kunden auf deine Website weiterleiten** → `https://wsd-bartek.github.io/ai-test/danke.html`
- [ ] **Rechnungsadresse erfassen** aktivieren
- [ ] **Steuer-ID erfassen** aktivieren (B2B-Kunden)
- [ ] **Telefonnummer** nicht nötig
- [ ] Optional **Rechnung (PDF) nach Zahlung erstellen**, falls du die Rechnungen nicht über dein übliches Rechnungstool schreibst
- [ ] Zahlungsmethoden: Karte, SEPA-Lastschrift, Apple/Google Pay (je nach Account)

Zum Schluss schickst du mir die 4 URLs im Format `fix: https://buy.stripe.com/…` usw.
