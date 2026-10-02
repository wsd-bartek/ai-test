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
