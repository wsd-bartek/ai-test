# RESEARCH.md – Marktanalyse

**Stand:** 2026-10-02 · Methode: Websuche (WebFetch ist für fast alle Domains gesperrt, siehe `MISSION_LOG.md` #000)

## Rahmenbedingungen aus den Antworten des Users

- Zahlung läuft über Stripe (bestehender Account von WSD).
- **Keine** vorhandenen Assets, kein Netzwerk, **kein LinkedIn und keine Prospai-Outreach**. Es soll „komplett was Neues“ sein.
- Der User führt Kundengespräche. Wie viel Zeit er investiert, hängt von der Idee ab.

### Rechtlicher Rahmen für die Akquise (Deutschland)

Unaufgeforderte Werbe-E-Mails an Unternehmen sind unzulässig (§ 7 UWG). Das gilt auch für Kontaktformulare. Kaltakquise am Telefon geht nur mit mutmaßlicher Einwilligung und ist entsprechend riskant.

→ **Wir brauchen Kanäle, in denen Käufer von sich aus Bedarf äußern:** Marktplätze, öffentliche Gesuche, Suche, Template-Galerien.

---

## Kernerkenntnis der Recherche

Jede Nische mit gut sichtbarer Suchnachfrage ist **bereits dicht besetzt**:

- **Widerrufsbutton** (Pflicht seit 19.06.2026): SaaS ab 2,99 €/Monat, kostenlose Shopify- und Wix-Apps, sogar Vergleichsseiten.
- **BFSG**: mindestens 8 kostenlose Scanner (eRecht24, IT-Recht Kanzlei …), Berichte ab 19 €, Audits ab 490 €.
- **E-Rechnung**: Excel-Add-ins, Vorlagen, Stripe-Partner-Apps (Fizard, MiracleBill, Billit), rechnungsapi.de.
- **Arbeitszeugnis-Check**: ab 6,99 €.

**Folgerung:** Für uns ohne Reichweite und ohne Budget ist nicht die Nische der Engpass, sondern **der Zugang zu Käufern mit akutem Bedarf**. Das Geschäftsmodell muss deshalb um den Kanal herum gebaut werden, nicht um die Idee.

---

## Bewertete Geschäftsmodelle

Skala 1–5 (5 = am besten). „User-Aufwand“: 5 = sehr wenig Aufwand für den User.

| # | Modell | P(Umsatz) | Speed | €0 | Einfach | User-Aufwand | Skalierbar | **Summe** |
|---|---|---|---|---|---|---|---|---|
| A | **Festpreis-Automatisierung (n8n/KI) als Produktservice** | 4 | 4 | 5 | 3 | 2 | 2 | **20** |
| B | Digitale Produkte (Templates) über Gumroad und eigene Seite | 2 | 2 | 5 | 4 | 4 | 4 | 21* |
| C | Compliance-SaaS bzw. Free-Tool über SEO (BFSG/Widerruf/E-Rechnung) | 2 | 1 | 5 | 3 | 4 | 4 | 19* |
| D | Open-Source-Bounties (Algora) | 1 | 3 | 5 | 3 | 5 | 1 | 18 |
| E | Fiverr-Mikroservices (Übersetzung, Texte) | 2 | 3 | 5 | 4 | 2 | 2 | 18 |
| F | Excel-Add-in (XRechnung) im Microsoft Marketplace | 2 | 1 | 5 | 2 | 4 | 4 | 18* |
| G | Websites für lokale Betriebe mit Vor-Ort-Vertrieb | 4 | 4 | 5 | 4 | 1 | 2 | — |

\* Die Summe allein entscheidet nicht. Laut Prioritätsregel kommen **P(Umsatz) und Speed zuerst**. B, C und F verlieren genau dort.

### A – Festpreis-Automatisierung (n8n/KI-Workflows) ✅ gewählt

- **Problem:** Laut Bitkom (2026) verbringen Mitarbeitende in KMU **4,5 Std./Woche** mit manuellen Routineaufgaben. Vor allem ab 1.1.2027 gilt die E-Rechnungs-Pflicht beim Versand für Firmen mit mehr als 800.000 € Umsatz. Nur 42 % versenden schon regelmäßig E-Rechnungen, 21 % schreiben Rechnungen noch mit Excel oder Word.
- **Zielgruppe:** KMU und Selbstständige in DACH; international Agenturen und Start-ups, die n8n nutzen.
- **Bestehende Lösungen und Preise:** n8n-Freelancer und -Agenturen verlangen **500–2.000 € pro einfachem Workflow**, ab 120 €/Std. Es gibt Agenturen mit „erster Flow ab 900 €“. Im n8n-Forum bieten Agenturen (u. a. aus Indien) Monatsverträge für 800–1.500 $ an.
- **Wettbewerb:** groß, aber teuer und langsam. **Unser Vorteil:** Die Lieferung durch KI kostet fast nichts. So sind Festpreise von **290–890 €**, Lieferung in 2–5 Tagen und **ein funktionierender Prototyp schon im Angebot** möglich. Das kann ein menschlicher Freelancer wirtschaftlich nicht leisten.
- **Monetarisierung:** Festpreispakete per Stripe Payment Link, 100 % im Voraus mit Geld-zurück-Garantie. Für €1.000 reichen **2–3 Projekte**.
- **Akquise ohne Kaltakquise:**
  - Jobs-Kategorie im n8n-Community-Forum, sehr aktiv, mehrere Posts pro Woche, auch im September 2026
  - Reddit `[Hiring]`-Posts in r/n8n, r/forhire, r/automation
  - Fiverr (seit 2025 mit deutscher Oberfläche, Traffic aus Deutschland deutlich gestiegen)
  - 1 kostenlose Kleinanzeigen-Dienstleistungsanzeige (30 Tage)
  - kostenlose Templates in der n8n-Template-Galerie (Domain mit sehr hoher Autorität) und auf GitHub als Inbound-Quelle
- **Aufwand:**
  - Ich: Landingpage, Workflows, Angebote, Lieferung.
  - User: Accounts anlegen (ca. 1,5 Std. einmalig), danach ca. 20–30 Min./Tag für Antworten, Weiterleiten und Calls.
- **Risiken:**
  - Ich kann Integrationen hier nicht live gegen Kunden-APIs testen. Gegenmittel: lokale n8n-Instanz, Mock-Daten, Übergabe-Call.
  - Starker Wettbewerb auf Jobbörsen.
  - Antwortgeschwindigkeit des Users.
- **Infrastruktur:** GitHub Pages, Stripe Payment Links, lokales n8n (npm) zur Validierung, GitHub Actions für Aufgaben mit Internetzugang.
- **Zeit bis zum ersten Umsatz:** realistisch **1–3 Wochen** nach Go-live der Kanäle.
- **Skalierbarkeit:** mittel. Wiederkehrende Workflows werden zu Templates bzw. Produkten (Übergang zu Modell B).

### B – Digitale Produkte (Templates)

- **Problem und Zielgruppe:** Selbstständige, Notion-, Excel- und n8n-Nutzer.
- **Wettbewerb:** extrem viel kostenlose Konkurrenz, z. B. tausende Gratis-Templates in der n8n-Galerie und beim Suchbegriff „Vorlage“. Die Preise liegen bei 10–50 €, nötig wären also 20–100 Verkäufe.
- **Ohne Publikum** kommt der erste Umsatz typischerweise erst nach Monaten.
- **Infrastruktur:** Gumroad ist kostenlos (10 % Gebühr). Etsy fällt raus, weil es Listing- und Einrichtungsgebühren kostet.
- **Entscheidung:** **Nicht jetzt.** Als Ausbaustufe von A wird es später sinnvoll, weil gelieferte Workflows dann zu Produkten werden.

### C – Compliance-SaaS bzw. Free-Tool mit SEO

- **Widerrufsbutton:** seit 19.06.2026 Pflicht. Angebote ab 2,99 €/Monat, Shopify und Wix gratis, WooCommerce über Germanized/German Market.
- **BFSG:**
  - Zwei Abmahnwellen (die zweite seit Februar 2026, ca. 2.700 € pro Abmahnung).
  - Laut einer Studie erfüllen nur 1 % von 2.446 Shops die Anforderungen.
  - Der Markt ist aber voll mit kostenlosen Scannern und Agentur-Content.
- **E-Rechnung:** Vorlagen, Add-ins, Konverter und Stripe-Apps gibt es zuhauf.
- **SEO** mit einer neuen Domain gegen etablierte Kanzleien und Agenturen braucht Monate.
- **Entscheidung:** **verworfen** als Hauptstrategie. Der E-Rechnung-Teil lebt als Leistungspaket in A weiter, mit der Frist 1.1.2027 als Dringlichkeits-Hook.

### D – Open-Source-Bounties (Algora)

- **Vorteile:** Bezahlung über Stripe Connect bei Merge, 50–2.500 $ pro Bounty, kein Vertrieb nötig.
- **Dagegen spricht:**
  - Massive KI-PR-Flut. 37 Projekte verbieten KI-Beiträge ganz, curl hat sein Bounty-Programm eingestellt, GitHub hat im August 2026 Sperren für PRs eingeführt.
  - Die Algora-AGB verbieten „robotic access“.
- **Folge:** Es drohen ein Reputationsrisiko für den GitHub-Account des Users und eine geringe Erfolgsquote.
- **Entscheidung:** **verworfen**. Sowohl das Ethik-/AGB-Risiko als auch das Verhältnis von Erfolgschance zu Aufwand sprechen dagegen.

### E – Fiverr-Mikroservices (Übersetzung, Texte)

- **Kommodifizierung:** KI-Übersetzung ist Massenware, Käufer zahlen für Garantien, die ein Mensch gibt.
- **Täuschungsrisiko:** Man müsste die Leistung als „menschlich“ verkaufen.
- **Entscheidung:** **verworfen**. Fiverr wird aber **als Kanal** für A genutzt.

### F – Office-Add-in (XRechnung aus Excel)

- **Vorteile:** Veröffentlichung im Microsoft Marketplace ist kostenlos und hat eine eingebaute Suche.
- **Dagegen spricht:**
  - Zertifizierung dauert Wochen.
  - Es gibt schon Konkurrenz (XL-E-Rechnung, Vorlagen).
  - Die Lizenzierung muss selbst gebaut werden.
- **Entscheidung:** **verworfen**, weil es zu langsam ist. Ein möglicher späterer Pivot.

### G – Websites für lokale Betriebe

Hohe Erfolgschance, aber der Vertrieb läuft persönlich bzw. vor Ort und überschneidet sich mit dem Geschäft von WSD. Der User will „komplett was Neues“. → **ausgeschlossen.**

---

## Kanal-Check: Was ist für uns kostenlos nutzbar?

| Kanal | Kosten | Käuferabsicht | Bemerkung |
|---|---|---|---|
| n8n Community-Forum, Kategorie „Jobs“ | 0 | hoch (aktive Gesuche) | Englisch, Antwort auf Gesuche ist ausdrücklich erwünscht |
| Reddit r/n8n, r/forhire, r/automation (`[Hiring]`) | 0 | hoch | nur auf Gesuche antworten, Sub-Regeln beachten |
| Fiverr | 0 (20 % Gebühr) | hoch | erster Auftrag typisch nach 1–6 Wochen |
| Kleinanzeigen Dienstleistungen | 1 Anzeige gratis (30 Tage) | mittel | seit 01.09.2026 nur noch 1 Gratis-Anzeige |
| n8n-Template-Galerie und GitHub | 0 | mittel | starke Domain, Profil verlinkt auf uns |
| Upwork | Connects kosten Geld | — | ❌ verstößt gegen das €0-Budget |
| freelancermap, freelance.de | Bewerben nur mit Premium | — | ❌ |
| Etsy, Chrome Web Store, Shopify App Store | Einrichtungsgebühren | — | ❌ |

---

## Quellen

- [Widerrufsbutton: § 356a BGB seit 19.06.2026 (Noerr)](https://www.noerr.com/de/insights/umsetzungsgesetz-zum-widerrufsbutton-veroeffentlicht)
- [Widerrufsbutton-Lösungen für Shopsysteme (IT-Recht Kanzlei)](https://www.it-recht-kanzlei.de/widerrufsbutton-loesungen-shopsysteme.html)
- [WiderrufButton (ab 2,99 €/Mon.)](https://widerrufbutton.net/)
- [BFSG-Abmahnwellen 2026 (D!E mit Ausrufezeichen)](https://die-mit-ausrufezeichen.de/bfsg-abmahnung-barrierefreiheit-website/)
- [BFSG-Abmahnwelle 2026 (xictron)](https://www.xictron.com/de/blog/bfsg-abmahnwelle-2026-barrierefreiheit-durchsetzen)
- [Buzzmatic-Studie: 1 % von 2.446 Shops BFSG-konform](https://buzzmatic.net/barrierefreiheit-im-e-commerce-studie/)
- [bf-check.de (Bericht 19 €)](https://bf-check.de/)
- [Händlerbund BFSG-Check (79 €)](https://marketplace.haendlerbund.de/products/haendlerbund-bfsg-check-fuer-barrierefreiheit)
- [Barrierenlos Audit ab 490 €](https://barrierenlos.com/bfsg-audit/)
- [E-Rechnung-Pflicht 2027, 800.000 €-Grenze (ihp-media)](https://www.ihp-media.com/ratgeber/e-rechnung-pflicht-2027-unternehmen-800000-euro/)
- [E-Rechnung 2027: Umfrage-Zahlen (it-boltwise)](https://www.it-boltwise.de/e-rechnungspflicht-ab-2027-wer-800-000-euro-umsatz-hat-muss-senden.html)
- [E-Rechnung aus Excel/Word: Anbieter (erechnung-tool.de)](https://www.erechnung-tool.de/e-rechnung-aus-word-excel)
- [Stripe erzeugt keine EN-16931-E-Rechnungen (bonpago)](https://www.bonpago.de/blog/tag/e-rechnung/stripe-e-rechnung)
- [E-Rechnungen mit n8n einlesen (diezukunftshelden)](https://www.diezukunftshelden.de/blog/e-rechnungen-automatisiert-einlesen-datev-uebergeben/)
- [Arbeitszeugnis-Check-Preise (zeugnischecker)](https://zeugnischecker.de/blog/arbeitszeugnis-pruefen-kosten)
- [n8n-Kosten und Freelancer-Preise für KMU (fachkraft-jetzt)](https://ki.fachkraft-jetzt.de/magazin/n8n-kosten/)
- [Was kostet KI-Automation im KMU? (coreiq)](https://coreiq.ch/ratgeber/was-kostet-ki-automation-kmu/)
- [n8n-Freelancer-Preise (justinkeirath)](https://www.justinkeirath.com/n8n-freelancer/)
- [n8n Community – Jobs](https://community.n8n.io/c/jobs/13?page=1)
- [n8n Community – „Need help with n8n workflows (paid)“](https://community.n8n.io/t/need-help-with-n8n-workflows-paid/279164)
- [Algora: Ablauf und Auszahlung](https://gigs.sh/p/algora)
- [Algora-AGB und KI-PR-Verbote](https://github.com/joyelgeorge/Taskman/issues/194)
- [GitHub erwägt PR-Sperren wegen AI-Slop (The Register)](https://www.theregister.com/2026/02/03/github_kill_switch_pull_requests_ai/)
- [Fiverr: Zeit bis zum ersten Auftrag](https://hustlespire.com/how-long-to-get-orders-on-fiverr/)
- [Fiverr startet deutsche Seite](https://affiliates.fiverr.com/blog/fiverr-launches-site-for-german-buyers/)
- [Kleinanzeigen: Konditionen für gewerbliche Anbieter](https://themen.kleinanzeigen.de/gebuehren-kleinanzeigen-gewerbliche-nutzer/)
- [Microsoft Marketplace: Veröffentlichung kostenlos](https://learn.microsoft.com/de-de/partner-center/marketplace-offers/appsource-submission-faq)
