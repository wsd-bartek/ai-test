# Antworten auf Gesuche (n8n-Forum, Reddit, HN)

## Spielregeln (bitte einhalten, das ist kein Spam)

1. **Nur auf Gesuche antworten**, in denen jemand ausdrücklich Hilfe sucht (`[Hiring]`, „paid“, „looking for“), oder in ausgewiesenen Self-Promo-Threads posten (r/forhire `[For Hire]`, HN „Freelancer? Seeking freelancer?“).
2. Vor dem Posten die Regeln des jeweiligen Forums bzw. Subreddits lesen. Keine unaufgeforderten DMs, außer der Post bittet darum.
3. **Ein** Post pro Gesuch. Konkret, kein Copy-Paste-Blabla.
4. Ehrlich bleiben: KI-gestützte Entwicklung nicht verschweigen.

## Ablauf mit mir (schnellster Weg)

1. Du siehst ein passendes Gesuch und kopierst Titel und Text hier in den Chat.
2. Ich schreibe die maßgeschneiderte Antwort und, wo sinnvoll, einen **Prototyp-Workflow** (JSON-Datei bzw. Gist-Text) zum Anhängen.
3. Du postest die Antwort, und ich trage das Gesuch im Experiment-Log ein.

Wenn du ohne mich antworten willst, nimm die Vorlage unten und ersetze die `{…}`.

---

## Vorlage EN (n8n-Forum / Reddit)

```
Hi {name},

I can build this as a fixed-price project: {price}, delivered in {days} business days.

How I'd approach it:
1. {trigger, e.g. "Gmail trigger on new emails with label X"}
2. {processing, e.g. "extract fields with an AI node, validate them"}
3. {output, e.g. "append to Google Sheets + Slack message; errors go to a separate alert"}

{Optional: "I already sketched the workflow skeleton so you can see the structure: [attachment/link]"}

Included: error handling, a short setup guide, a 30-min handover call and free fixes for 14 days. I don't need your credentials; you add them in your own n8n.

Packages & how I work: https://wsd-bartek.github.io/ai-test/en/
(I build with AI assistance, which is why it's fast and fixed-price. Everything is still tested and documented.)

{first name}, Nodewise
```

## Vorlage DE

```
Hallo {Name},

das kann ich dir als Festpreis-Projekt bauen: {Preis}, Lieferung in {Tage} Werktagen.

So würde ich es umsetzen:
1. {Auslöser}
2. {Verarbeitung}
3. {Ergebnis}

Inklusive: Fehlerbehandlung, kurze Anleitung, 30-Min-Übergabe-Call und 14 Tage kostenlose Nachbesserung. Zugangsdaten brauche ich nicht, die trägst du selbst in deinem n8n ein.

Pakete & Ablauf: https://wsd-bartek.github.io/ai-test/

Viele Grüße
{Vorname}, Nodewise
```

---

## Self-Promo-Posts in erlaubten Threads

### r/forhire: Titel `[For Hire] n8n automation developer – fixed-price workflows from $99`
```
I build and fix n8n workflows at fixed prices:

• Fix a broken workflow – $99 (24–48 h)
• New workflow, up to 3 apps – $290 (3 days)
• E-invoice intake (XRechnung/ZUGFeRD/Factur-X) – $490
• Sprint: up to 3 workflows or 1 AI agent – $890

Every workflow comes with error handling, a setup guide, a handover call and free fixes. You keep your credentials; I deliver an import file.

Built with AI assistance (fast + affordable), tested and documented.
Details: https://wsd-bartek.github.io/ai-test/en/. Comment or DM with a short description of your process.
```

### Hacker News: monatlicher Thread „Freelancer? Seeking freelancer?“ (Kommentar)
```
SEEKING WORK | Remote | Germany (EU)
Fixed-price n8n automations & integrations: fix a workflow ($99), new workflow ($290), EU e-invoice processing (XRechnung/ZUGFeRD), small AI-agent workflows.
Tested, documented, with handover call. AI-assisted, which keeps it fast and cheap.
https://wsd-bartek.github.io/ai-test/en/
Email: {contact email}
```
