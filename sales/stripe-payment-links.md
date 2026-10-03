# Stripe: neues Konto für Wowora und 4 Zahlungslinks

**Wichtig:** Ein Stripe-Konto kann nur der Inhaber selbst anlegen, weil Stripe eine Identitätsprüfung (KYC), einen Ausweis und eine Bankverbindung verlangt. Ich kann das nicht für dich tun; stripe.com ist von meiner Umgebung aus zudem gesperrt.

**Bis Stripe aktiv ist, verkaufen wir auf Rechnung (Überweisung).** Die Website ist schon darauf eingestellt. Stripe ist also kein Blocker für den Go-live.

---

## Teil 1: Konto anlegen (ca. 15 Min.)

1. Auf stripe.com/de auf **Jetzt starten** klicken und dich mit einer E-Mail registrieren. Empfohlen: `hallo@wowora.de` bzw. die Adresse, die du dafür nutzt.
2. Bei **Unternehmensdetails**:

| Feld | Eingabe |
|---|---|
| Land | Deutschland |
| Unternehmenstyp | Einzelunternehmen |
| Rechtlicher Name | Massin El Khadri |
| Geschäftsadresse | Alter Keller 12, 36160 Dipperz |
| Branche | Software / IT-Dienstleistungen (bzw. „Computer-Programmierung, Datenverarbeitung“) |
| Website | `https://wowora.de` |
| Produktbeschreibung | siehe Text unten |
| Abrechnungsbezeichnung auf Kontoauszügen | `WOWORA` |
| Steuer-ID | deine USt-IdNr., falls vorhanden |

   Produktbeschreibung zum Einfügen:
   ```
   Wowora erstellt Automatisierungen (n8n-Workflows) für Unternehmen zum Festpreis: Einrichtung, Reparatur und Anpassung von Workflows, u. a. zur automatischen Verarbeitung von E-Rechnungen. Leistungen werden digital erbracht und vorab bezahlt. Nur B2B.
   ```
3. **Bankkonto** für Auszahlungen hinzufügen. Am besten nutzt du ein Geschäftskonto, falls vorhanden.
4. **Identität bestätigen** (Ausweis).

## Teil 2: Zahlungslinks anlegen (ca. 10 Min.)

Gehe auf **Produktkatalog → Produkt hinzufügen** und danach auf **Payment Links → Neu**. Das machst du für jedes der 4 Pakete.

Weil du regelbesteuert bist (19 % USt.), legst du die **Bruttobeträge** an. Die Website zeigt die Nettopreise mit dem Hinweis „zzgl. 19 % USt.“.

| Schlüssel | Produktname | Preis brutto (einmalig) | Netto |
|---|---|---|---|
| `fix` | Wowora Workflow-Fix | **117,81 €** | 99 € |
| `starter` | Wowora Starter-Automatisierung | **345,10 €** | 290 € |
| `erechnung` | Wowora E-Rechnung-Eingang | **583,10 €** | 490 € |
| `sprint` | Wowora Automatisierungs-Sprint | **1.059,10 €** | 890 € |

Diese Beschreibung ergänzt du bei jedem Produkt:
`Preis inkl. 19 % USt. Nur für Unternehmer (B2B).`

**Einstellungen pro Link:**
- [ ] **Nach der Zahlung → Bestätigungsseite → Kunden auf deine Website weiterleiten:** `https://wowora.de/danke.html`
- [ ] **Rechnungsadresse erfassen:** an
- [ ] **Steuer-ID erfassen:** an (B2B-Kunden)
- [ ] **Rechnung nach Zahlung erstellen (PDF):** an. Dann gibt es automatisch eine Rechnung. Die Option kostet bei Stripe eine kleine Gebühr pro Rechnung, die vom Umsatz abgezogen wird; vorab fällt nichts an.

Danach schickst du mir die 4 URLs im Format `fix: https://buy.stripe.com/…`. Ich trage sie ein, und die Website schaltet automatisch von „Buchung per E-Mail“ auf „online bezahlen“ um.
