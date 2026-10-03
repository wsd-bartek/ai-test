# MISSION_LOG.md

Chronologisches Protokoll der €1.000-Zero-Budget-Challenge.

**Current Revenue:** €0 · **Target:** €1.000 · **Remaining:** €1.000

---

## #000 · 2026-10-02 · Bestandsaufnahme vor dem Start

**Was wurde gemacht?**
Ich habe Repository, Umgebung, Netzwerkzugang und verbundene Tools geprüft. Danach habe ich `QUESTIONS.md` erstellt.

**Warum?**
Die Vorgabe lautet: zuerst Einschränkungen verstehen und alle nötigen Fragen gebündelt stellen, dann autonom arbeiten.

**Ergebnis / gesammelte Daten**

*Repository*
- `wsd-bartek/ai-test` ist **öffentlich** und war **leer**: keine Commits, `main` ist der Default-Branch, GitHub Pages ist nicht aktiv.
- Gearbeitet wird auf dem Branch `claude/pensive-fermat-5pqh31`.

*Laufzeit*
- Node 22, Bun, Python 3.11, Go und Docker sind vorhanden.
- Es gibt rund 30 GB Speicher.

*Netzwerk*
- Ausgehend sind nur **GitHub (API und Git)** und Paket-Registries (npm, PyPI usw.) erreichbar.
- Blockiert sind unter anderem Google, Reddit, LinkedIn, Stripe, Gumroad, Vercel, Netlify, Product Hunt, Hacker News und `*.github.io`.
- **WebSearch funktioniert** (US-Index). Für öffentliche Seiten gibt es zusätzlich WebFetch.

*Verbundene Connectoren*
- **Prospai** (Login `management@wir-skalieren-dich.de`):
  - 1 Workspace mit 1 verbundenem LinkedIn-Account („Bartosz A. Sokol“).
  - 1 Kampagnen-Entwurf „Outreacher Coaches“.
  - Abo-Status **past_due**: Testphase am 30.09.2026 beendet, Kündigung zum Laufzeitende.
- **Higgsfield**: 39,3 Credits, Starter-Plan, keine Websites, kein TikTok-Account verbunden. Kann Websites hosten sowie Bilder und Videos generieren.
- **GitHub** (MCP): Account `wsd-bartek`, angelegt 2026-09.

*Weitere Hinweise*
- Es gibt einen installierten Skill „Kfz-Gutachter-Website-Builder“. Er deutet auf ein bestehendes Agentur-Angebot hin.
- Es ist kein E-Mail- oder Zahlungs-Connector verbunden.

**Was wurde gelernt?**
1. **Distribution und Zahlung sind der Engpass, nicht das Bauen.** Ich kann nirgends selbst posten, senden oder kassieren. Jedes Geschäftsmodell braucht deshalb einen kurzen, klaren Handgriff des Users, oder einen Connector, der ihn ersetzt.
2. **Ein bestehendes Netzwerk ist bei €0 vermutlich der stärkste Hebel.** Das sind hier die Agentur, der LinkedIn-Account und die Gutachter-Nische. Ob und wie es genutzt werden darf, klären Fragen B1, B2 und C1.
3. **Das Repo ist öffentlich.** Leads und Kundendaten gehören niemals ins Repo (DSGVO).

**Entscheidung**
Ich baue noch nichts. Erst kommen die Antworten auf die 🔴-Fragen in `QUESTIONS.md`.

**Nächster Schritt**
Antworten abwarten. Danach folgen die Research-Phase (`RESEARCH.md`) und die Entscheidung (`STRATEGY.md`).

---

## #001 · 2026-10-02 · Research und Strategieentscheidung

**Was wurde gemacht?**
- Antworten des Users ausgewertet und in `QUESTIONS.md` eingetragen.
- Etwa 20 Websuchen zu 7 Geschäftsmodellen und 10 Kanälen. Ergebnis: `RESEARCH.md`.
- Entscheidung getroffen: `STRATEGY.md`.

**Warum?**
Die Vorgabe lautet, vor dem Bauen den Markt zu prüfen. Die Antworten haben die Lage stark verändert: kein Netzwerk, kein LinkedIn.

**Ergebnis / gesammelte Daten**
- **Compliance-Nischen sind gesättigt:**
  - Widerrufsbutton: Angebote ab 2,99 €/Monat.
  - BFSG: mindestens 8 kostenlose Scanner, Berichte ab 19 €.
  - E-Rechnung: viele Add-ins und Stripe-Apps.
- **Bounties:** KI-PR-Flut, Verbote in vielen Projekten, die Algora-AGB untersagen automatisierten Zugriff.
- **n8n-Freelancer** verlangen 500–2.000 € pro Workflow. Im n8n-Forum gibt es aktive bezahlte Gesuche, auch im September 2026.
- **Kleinanzeigen:** gewerblich nur noch 1 Gratis-Dienstleistungsanzeige (seit 01.09.2026).
- **Upwork und freelancermap** kosten Geld fürs Bewerben → ausgeschlossen.
- **WebFetch** ist für fast alle Domains gesperrt (n8n-Forum, widerrufsbutton.de, incubagent.com).
- Der Name **„Nodewise“** ist im Automatisierungsbereich frei. „FlowWerk“ und „Taskwright“ sind vergeben.

**Was hat funktioniert?**
Die Websuche reicht für eine Marktübersicht. Preise und Wettbewerb sind gut sichtbar.

**Was hat nicht funktioniert?**
Konkrete Seiten konnte ich nicht direkt lesen (Egress-Sperre).

**Was wurde gelernt?**
Siehe L01–L04 in `LEARNINGS.md`. Der Kern: **Ohne Reichweite gewinnt der Kanal, nicht die Nische.**

**Entscheidung**
**Nodewise: n8n/KI-Automatisierung zum Festpreis.**
- Pakete: €99 Fix, €290 Starter, €490 E-Rechnung, €890 Sprint.
- Verkauf über Antworten auf öffentliche Gesuche, Fiverr und Kleinanzeigen.
- Lieferung durch mich, Calls durch den User.

**Nächster Schritt**
MVP bauen:
1. Landingpage (DE und EN) mit Impressum und Datenschutz
2. 2 Referenz-Workflows, validiert in lokalem n8n
3. Sales-Kit
4. `USER_ACTIONS.md` mit allen einmaligen Handgriffen

---

## #002 · 2026-10-03 · MVP gebaut

**Was wurde gemacht?**
1. **Landingpage** `docs/` (DE + EN): 4 Festpreispakete, Stripe-Links über `config.js` (bis dahin Fallback auf E-Mail), Impressum-Vorlage, Datenschutz, Leistungsbedingungen (nur B2B), Danke-Seite. Getestet in Chromium: Desktop, Mobil, Dark Mode, kein Überlauf, keine JS-Fehler.
2. **Sales-Kit** `sales/`: Stripe-Anleitung, 2 Fiverr-Gigs, Kleinanzeigen-Anzeige, Antwortvorlagen für Gesuche, Profiltexte.
3. **`USER_ACTIONS.md`**: alle einmaligen Handgriffe des Users (ca. 25 Min. Go-live und ca. 45 Min. Kanäle).
4. **Referenz-Workflow** `workflows/e-rechnung-eingang`:
   - Parser ohne Abhängigkeiten für XRechnung, ZUGFeRD und Factur-X.
   - **240/240 offizielle Testrechnungen** gelesen.
   - Ende-zu-Ende in n8n 2.41.6 ausgeführt.
   - Dient als Lieferobjekt für das €490-Paket, als Portfolio und als Inbound-Asset.
5. **Lead-Radar** (GitHub Action, 4× täglich): sammelt öffentliche Gesuche in `leads/radar.md`.
6. `EXPERIMENTS.md` mit den Experimenten #001–#004 angelegt.

**Warum?**
- Kleinster MVP, der verkaufen kann: Seite, Zahlung, Kanäle.
- Der Workflow macht das teuerste Paket sofort lieferbar und gibt Glaubwürdigkeit („zeig, dass du es kannst“).

**Ergebnis**
Alles ist gebaut und gepusht. Der Umsatz ist weiterhin €0. Der Engpass liegt jetzt **vollständig bei den Go-live-Schritten des Users** (E-Mail, Impressum, Stripe-Links, Pages).

**Was hat funktioniert?**
- Test gegen offizielle Korpora (2 Bugs gefunden und behoben).
- Node 24 über die npm-Registry.
- GitHub Actions als „Arme“ ins Internet.

**Was hat nicht funktioniert?**
- n8n lief erst nicht (Node-Version, isolated-vm). Gelöst, siehe L05.

**Entscheidung**
Keine weiteren Features bauen, bevor die Kanäle live sind. Regel 8: nicht endlos bauen.

**Nächster Schritt**
1. User erledigt Block 1 aus `USER_ACTIONS.md`.
2. Ich trage Links und Daten ein.
3. Pages live → Block 2 (Kanäle) → Experiment #001 startet mit den ersten Gesuchen aus dem Radar.

---

## #003 · 2026-10-03 · Täglicher Check-in #1

- Der Lead-Radar-Cron um 05:23 UTC ist **nicht gelaufen**. Ich habe ihn manuell gestartet, und der Check-in stößt ihn künftig selbst an (L09).
- Markt laut Radar: 10 Gesuche und 15 Selbstangebote in 10 Tagen, kein neues Gesuch in den letzten 36 h, also keine Entwürfe.
- Reddit liefert aus Actions leere RSS-Feeds. Das wird jetzt als Fehler ausgewiesen.

---

## #004 · 2026-10-03 · Antworten des Users umgesetzt: Wowora geht live-fähig

**Was wurde gemacht?**
- **Rebranding Nodewise → Wowora** auf allen Seiten, im Sales-Kit, im Workflow (neu gebaut, Tests weiterhin 240/240) und im Lead-Radar.
- **Domain:**
  - `docs/CNAME` = `wowora.de`.
  - DNS-Analyse: NS bei GoDaddy, MX bei Microsoft 365, die Website zeigt auf Lovable (`185.158.133.1`).
  - Konkrete DNS-Tabelle für den User erstellt.
- **Impressum** ausgefüllt. Kontakt `hallo@wowora.de`.
- **Datenschutz** um Microsoft 365 (E-Mail) und Zahlung auf Rechnung ergänzt.
- **Bezahlung:** Ohne Stripe-Links zeigt die Seite automatisch „Buchung per E-Mail, Zahlung auf Rechnung“. Mit Links wechselt sie automatisch auf Online-Zahlung.
- **Stripe-Anleitung** für ein neues Konto (Einzelunternehmen) inkl. Bruttopreisen (19 % USt.).
- `USER_ACTIONS.md` neu: Go-live in ca. 15 Min. (E-Mail-Alias, Pages, DNS).

**Warum?**
Der User will die eigene Domain und ein neues Stripe-Konto. Damit Stripe den Go-live nicht blockiert, läuft die Zahlung vorerst über Rechnung (bei B2B üblich).

**Ergebnis**
Technisch ist alles bereit. Für den Go-live fehlen nur noch 3 Handgriffe des Users: Alias, Pages, DNS.

**Entscheidung / Annahmen**
- Regelbesteuerung (19 % USt.).
- Die Marke heißt Wowora.
- Umsatz wird netto gezählt.

**Nächster Schritt**
1. User erledigt Block 1.
2. Ich prüfe DNS und HTTPS und melde den Go-live.
3. Block 3: Kanäle, Fiverr zuerst.
