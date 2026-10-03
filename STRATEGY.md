# STRATEGY.md

**Stand:** 2026-10-03 · Version 1.2 · Änderungen werden in `PIVOTS.md` dokumentiert.

> **Update v1.2 (2026-10-03):** Die Marke heißt jetzt **Wowora** (Domain `wowora.de` des Users). Verkäufer ist das Einzelunternehmen Massin El Khadri (regelbesteuert). Bis zum neuen Stripe-Konto läuft die Zahlung auf Rechnung.
>
> **Update v1.1 (2026-10-03, siehe L08):** Das n8n-Forum ist angebotslastig (ca. 0,6 echte Gesuche/Tag, viel Konkurrenz). Die Positionierung wird geschärft: **E-Rechnung-Spezialist mit öffentlich getestetem Parser** statt „noch ein n8n-Freelancer“. Die Kanal-Reihenfolge ändert sich zu (1) Fiverr EN/DE, (2) Gesuche plus eigener differenzierter Forum-Post, (3) Kleinanzeigen, (4) Open-Source-Inbound.

## Gewähltes Geschäftsmodell

**Wowora: Automatisierungen (n8n/KI-Workflows) zum Festpreis.**

Das ist ein Produktservice: feste Pakete, feste Preise, feste Lieferzeiten.
Die Arbeit erledige ich (Claude) zu etwa 90 %: Konzept, Workflow-JSON, Tests, Dokumentation. Der User ist Ansprechpartner und führt die Übergabe-Calls.

## Warum dieses Modell?

1. **Höchste Chance auf echten Umsatz:**
   - Die Nachfrage ist belegt: Bitkom misst 4,5 Std./Woche manuelle Routine pro Mitarbeitendem.
   - Im n8n-Forum laufen aktive bezahlte Gesuche.
   - Ab 1.1.2027 gilt die E-Rechnungs-Pflicht.
   - Der Marktpreis liegt bei 500–2.000 € pro Workflow.
2. **Schnell:** Für €1.000 reichen **2–3 Aufträge**. Es gibt keine Review- oder Freigabeprozesse, keine SEO-Wartezeit und keine App-Store-Zertifizierung.
3. **€0:** GitHub Pages, Stripe Payment Links und Marktplätze ohne Vorabgebühr. n8n ist kostenlos und lokal installierbar.
4. **Echter Wettbewerbsvorteil:** Unsere Lieferkosten liegen nahe null. Das erlaubt **Preise unter Marktniveau** und **einen funktionierenden Prototyp schon im Angebot**. Kein menschlicher Freelancer kann das wirtschaftlich.
5. **Passt zu den Vorgaben:** kein LinkedIn, keine Kaltakquise, kein Bezug zu WSD.

## Zielgruppe

- **Primär (schnelle Deals):** Leute und Firmen, die **öffentlich nach Hilfe suchen**. Das sind Gesuche im n8n-Forum, `[Hiring]`-Posts auf Reddit und Käufer auf Fiverr. Sie sind international und kommunizieren auf Englisch.
- **Sekundär (DACH):** KMU und Selbstständige mit Routinearbeit, vor allem rund um die **E-Rechnung**:
  - Eingang: XRechnung/ZUGFeRD empfangen und verarbeiten, Pflicht seit 2025.
  - Ausgang: Pflicht ab 2027 für Firmen über 800.000 € Umsatz.

## Problem

Routineprozesse fressen Zeit. Automatisierungs-Agenturen sind teuer (ab 900 € pro Flow) und langsam. Do-it-yourself scheitert oft an Details wie APIs, Fehlerbehandlung oder XML-Formaten.

## Lösung

Fertig importierbare, getestete n8n-Workflows. Dazu gehören:
- Setup-Anleitung
- 30-Minuten-Übergabe-Call
- Fehlerbehebung für einen festen Zeitraum

Lieferung in 1–5 Werktagen.

## Angebot und Preise

Alle Preise sind netto; ob MwSt. hinzukommt, hängt vom Steuerstatus des Verkäufers ab. Bezahlt wird 100 % im Voraus per Stripe Payment Link. Es gilt eine **Geld-zurück-Garantie**, falls der Workflow nicht wie vereinbart funktioniert.

| Paket | Preis | Inhalt | Lieferung |
|---|---|---|---|
| **Workflow-Fix** | **€99** | Bestehenden n8n-Workflow reparieren bzw. debuggen (1 Workflow, 1 Problem) | 24–48 h |
| **Starter** | **€290** | 1 neuer Workflow, bis zu 3 Apps, Doku, 30-Min-Übergabe, 14 Tage Fixes | 3 Werktage |
| **E-Rechnung-Eingang** | **€490** | XRechnung/ZUGFeRD aus dem Postfach automatisch auslesen, danach Tabelle, Buchhaltung oder DATEV-CSV, Archiv, lesbare Ansicht | 5 Werktage |
| **Sprint** | **€890** | Bis zu 3 Workflows oder 1 KI-Agent-Workflow, 30 Tage Support | 5 Werktage |

Warum diese Preise:
- Der Fix für €99 ist der **Einstieg mit niedriger Hürde** und bringt die ersten Bewertungen.
- €290 liegt deutlich unter dem Marktpreis (500 €+) und lässt trotzdem Spielraum nach oben, sobald Bewertungen da sind.

## Weg zu den ersten €100

1. **Landingpage live schalten** (GitHub Pages). Dazu legt der User 4 Stripe Payment Links an.
2. **Gesuche bedienen:** Der User kopiert neue Gesuche aus dem n8n-Forum oder von Reddit, oder mein „Lead-Radar“ sammelt sie (siehe Architektur). Ich schreibe dazu ein Angebot **mit funktionierendem Prototyp-Workflow** (JSON plus Screenshot bzw. Beschreibung). Der User postet die Antwort.
3. **Ziel:** erster bezahlter Fix (€99) oder Starter (€290) innerhalb von **14 Tagen** nach Go-live.

## Weg von €100 zu €1.000

- **Zusätzliche Kanäle:**
  - Fiverr: 2 Gigs (EN und DE)
  - Kleinanzeigen: 1 Gratis-Anzeige zum Thema E-Rechnung und Automatisierung
  - kostenlose Templates in der n8n-Galerie und auf GitHub, die auf die Landingpage verlinken
- **Bestandskunden:** Nach jedem Projekt fragen wir nach Folgeprojekten (Sprint) und nach einer Bewertung bzw. einem Testimonial.
- **Rechenbeispiel:**

| Auftrag | Betrag |
|---|---|
| 1 × Fix | €99 |
| 2 × Starter | €580 |
| 1 × E-Rechnung | €490 |
| **Summe** | **€1.169** |

## Akquisekanäle (priorisiert)

1. n8n Community, Kategorie „Jobs“ (Antworten auf Gesuche)
2. Reddit r/n8n, r/forhire, r/automation (nur `[Hiring]`-Posts, Sub-Regeln beachten)
3. Fiverr (EN und DE)
4. Kleinanzeigen (DACH, E-Rechnung)
5. GitHub und n8n-Template-Galerie (Inbound, langfristig)

Nicht genutzt: LinkedIn, Kalt-E-Mails, Massennachrichten, bezahlte Plattformen.

## Erwarteter Conversion-Funnel (Hypothesen, werden gemessen)

| Kanal | Annahme |
|---|---|
| Gesuche | 30 Angebote → 6 Antworten (20 %) → 3 Gespräche → **1–2 Aufträge** |
| Fiverr | erster Auftrag nach 1–4 Wochen |
| Kleinanzeigen | 100–300 Aufrufe/Monat → 1–3 Anfragen |

## Technische Architektur

| Komponente | Lösung | Kosten |
|---|---|---|
| Landingpage (DE + EN) | statisches HTML in `docs/`, GitHub Pages | €0 |
| Zahlung | Stripe Payment Links (WSD-Account), Redirect auf `danke.html` | Stripe-Gebühr |
| Kontakt | E-Mail-Adresse der Marke (Gmail o. ä., kostenlos) | €0 |
| Workflow-Entwicklung | lokales n8n (npm) im Container zur Import- und Logik-Validierung | €0 |
| E-Rechnung-Validierung | KoSIT-Validator (Open Source, von GitHub) | €0 |
| Lead-Radar | GitHub-Actions-Cron liest RSS-Feeds (n8n-Jobs, Reddit) und schreibt `leads/radar.md` (nur Titel und Links) | €0 (öffentliches Repo) |
| Kundendaten | **nie im Repo** (öffentlich, DSGVO). Austausch nur per E-Mail bzw. Chat | — |

## Risiken und Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|---|---|
| Ich kann Kunden-APIs hier nicht live testen | lokale n8n-Instanz, Mock-Daten, saubere Fehlerbehandlung, Übergabe-Call, Fix-Garantie |
| Starker Wettbewerb auf Jobbörsen | Prototyp im Angebot, Festpreis, Geschwindigkeit |
| User antwortet zu langsam | vorgefertigte Textbausteine, Lead-Radar, maximal 20–30 Min./Tag |
| Haftung bei E-Rechnung | Validierung mit dem offiziellen KoSIT-Validator. Wir machen **keine Steuerberatung**, nur technische Umsetzung |
| Plattformregeln (Reddit, Fiverr) | nur auf Gesuche antworten, kein Spam, KI-Unterstützung transparent machen |
| Neuer Account ohne Bewertungen | günstiger Einstiegs-Fix, Garantie, öffentliche Referenz-Workflows auf GitHub |

## Fallback-Strategie

Wenn **21 Tage nach Go-live** aller Kanäle kein bezahlter Auftrag da ist:
1. Analyse nach dem Schema in `LEARNINGS.md`: Lag es am Problem, Kanal, Preis oder Angebot?
2. **Pivot A → B:** Die gebauten Workflows werden als bezahlte Template-Pakete verkauft (Gumroad bzw. Stripe), mit Fokus auf DACH-Nischen wie lexoffice, sevDesk, DATEV und E-Rechnung.
3. **Pivot A → E-Rechnung-only:** DACH-Spezialisierung mit SEO-Landingpages zur Frist 1.1.2027.
4. Danach: Excel-Add-in (Modell F) als längerfristiger Produktansatz.
