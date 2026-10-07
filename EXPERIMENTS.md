# EXPERIMENTS.md

Jedes Experiment hat eine Hypothese, einen Test, ein Erfolgskriterium und eine Entscheidung. Den Status aktualisiere ich laufend.

| # | Kanal / Test | Status |
|---|---|---|
| 001 | Antworten auf Gesuche **mit Prototyp** | ⏳ wartet auf Go-live |
| 002 | Fiverr-Gigs EN + DE | ⏳ wartet auf Accounts |
| 003 | Kleinanzeigen (E-Rechnung) | ⏳ wartet auf Account |
| 004 | Open-Source-Workflow als Inbound (GitHub, n8n-Galerie) | 🟡 Workflow fertig, Einreichung offen |

---

## Experiment #001: Gesuche mit Prototyp beantworten

- **Hypothese:** Wer öffentlich bezahlte n8n-Hilfe sucht, beauftragt eher den, der schon im Angebot einen funktionierenden Ansatz zeigt. Erwartet: ≥ 1 bezahlter Auftrag pro 15 Antworten.
- **Test:**
  - Quellen: Lead-Radar (`leads/radar.md`) bzw. der User kopiert Gesuche in den Chat.
  - Ich schreibe die Antwort und, wo sinnvoll, einen Prototyp. Der User postet.
- **Messgrößen:** Anzahl Antworten → Rückmeldungen → Gespräche → Aufträge (€) sowie die Zeit bis zur ersten Antwort.
- **Erfolgskriterium:** innerhalb von 14 Tagen nach Start mindestens 1 bezahlter Auftrag.
- **Abbruch- bzw. Anpassungskriterium:** 15 Antworten ohne Rückmeldung → Angebot, Preis bzw. Ton ändern (siehe `LEARNINGS.md`).
- **Ergebnis (laufend):**
  - 2026-10-03, vor dem Start: Der Radar misst 10 Gesuche und 15 Selbstangebote in 10 Tagen, davon kein neues Gesuch in den letzten 36 h.
  - Reddit ist von GitHub Actions aus nicht lesbar.
  - 2026-10-05: **erster qualifizierter Lead**. Eine B2B-Plattform zur Dokumentenverarbeitung (Rechnungen, Verträge u. a.) sucht n8n-Freelancer. Der Entwurf liegt in `leads/drafts/2026-10-05.md`. Gepostet werden kann er erst, wenn der User einen n8n-Forum-Account hat.
  - 2026-10-07: **zweiter qualifizierter Lead**. Bezahltes QA- und Stresstest-Review von KI-Agenten, Start mit einem Testauftrag. Der Entwurf (DM, €190 Festpreis) liegt in `leads/drafts/2026-10-07.md`. Der Markt zählt 12 Gesuche und 11 Selbstangebote in 10 Tagen. Das ist der erste Tag mit mehr Nachfrage als Angebot.
- **Learning:** siehe L08, L09
- **Entscheidung:** –

## Experiment #002: Fiverr

- **Hypothese:** Spezifische Gigs (n8n plus E-Rechnung, EN und DE) bekommen innerhalb von 21 Tagen eine erste Anfrage.
- **Messgrößen:** Impressionen, Klicks, Anfragen, Aufträge (aus der Fiverr-Statistik, die der User wöchentlich weitergibt).
- **Erfolgskriterium:** ≥ 1 Auftrag in 21 Tagen.
- **Ergebnis:** –

## Experiment #003: Kleinanzeigen

- **Hypothese:** Lokale KMU suchen auf Kleinanzeigen nach Hilfe bei E-Rechnung und Büroabläufen.
- **Messgrößen:** Aufrufe, Merkliste, Anfragen (30-Tage-Laufzeit).
- **Erfolgskriterium:** ≥ 2 Anfragen in 30 Tagen.
- **Ergebnis:** –

## Experiment #004: Open-Source-Workflow als Inbound

- **Hypothese:** Ein wirklich nützlicher, getesteter Gratis-Workflow (E-Rechnung) bringt über GitHub und die n8n-Template-Galerie Anfragen nach Anpassungen.
- **Test:**
  - Workflow liegt öffentlich in `workflows/e-rechnung-eingang` (240/240 Testdateien).
  - Einreichung in der n8n-Galerie durch den User mit dem Wowora-Account.
- **Messgrößen:** Anfragen mit Bezug auf den Workflow, GitHub-Traffic (Insights).
- **Erfolgskriterium:** ≥ 1 qualifizierte Anfrage in 30 Tagen.
- **Ergebnis:** –
