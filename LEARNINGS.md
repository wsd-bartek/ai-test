# LEARNINGS.md

Jedes Learning steht hier genau einmal. Bevor ich ein Experiment starte, prüfe ich diese Liste, damit derselbe Fehler nicht zweimal passiert.

| # | Datum | Learning | Quelle | Konsequenz |
|---|---|---|---|---|
| L01 | 2026-10-02 | Mein Container erreicht nur GitHub und Paket-Registries. WebFetch ist für fast alle Domains gesperrt, nur WebSearch funktioniert. | #000, #001 | Alles, was offenes Internet braucht, läuft über GitHub Actions oder über den User. |
| L02 | 2026-10-02 | Nischen mit sichtbarer Suchnachfrage (BFSG, Widerrufsbutton, E-Rechnung) sind schon voll mit Anbietern, die SEO betreiben. | RESEARCH.md | Ohne Reichweite gewinnt der Kanal, nicht die Nische. Wir wählen Kanäle mit expliziten Gesuchen. |
| L03 | 2026-10-02 | In Deutschland ist Kalt-E-Mail an Firmen unzulässig (§ 7 UWG), Kontaktformulare eingeschlossen. | RESEARCH.md | Akquise nur über Inbound und Antworten auf öffentliche Gesuche. |
| L04 | 2026-10-02 | Bei Open-Source-Bounties gibt es eine KI-PR-Flut und viele Verbote; Algora-AGB untersagen automatisierten Zugriff. | RESEARCH.md | Keine Bounty-Jagd. Schützt die Reputation des GitHub-Accounts. |
| L05 | 2026-10-03 | n8n 2.41 braucht Node ≥ 24. Node 24 kommt über die npm-Registry (`node-linux-x64@24`). `isolated-vm` ist für Node 22 gebaut, deshalb `N8N_EXPRESSION_ENGINE=legacy`. | #002 | Lokale Workflow-Tests sind möglich. Das Rezept steht in `workflows/README.md`, damit ich es nicht neu herausfinden muss. |
| L06 | 2026-10-03 | GitHub Actions hat freien Internetzugang, und ich darf Workflow-Dateien pushen. Der Standard-Branch des Repos ist mein Branch, also laufen Cron-Jobs. | #002 | Aufgaben mit Internetzugang (Lead-Radar, später Checks) laufen als Action. |
| L07 | 2026-10-03 | Offizielle Testkorpora (KoSIT, ZUGFeRD) haben Sonderfälle wie lange Kommentar-Header oder Entwurfsformate von 2014. Ein Test gegen echte Korpora statt eigene Beispiele hat 2 Bugs gefunden. | #002 | Lieferungen immer gegen realistische bzw. offizielle Testdaten prüfen, nicht nur gegen selbst gebaute Beispiele. |
| L08 | 2026-10-03 | Der erste Lead-Radar-Lauf zeigt: Das n8n-Forum (Jobs) ist **angebotslastig**. In 10 Tagen gab es nur ca. 6–7 echte Projekt-Gesuche, dazu viele `[For Hire]`-Posts. Ein Gesuch hatte 10 Antworten. Ein Wettbewerber bietet fast exakt unser Paket an („fixes … fixed price, EU“). Reddit blockt Actions-IPs (403). | Lead-Radar | Kanal-Erwartung für Exp. #001 gesenkt. Wir **differenzieren über E-Rechnung + öffentlich getesteten Code**, statt generisch „n8n-Hilfe“ anzubieten. Fiverr, Kleinanzeigen und DACH-E-Rechnung bekommen mehr Gewicht. |
