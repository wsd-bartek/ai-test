# USER_ACTIONS.md: Was nur du tun kannst

Alles ist so vorbereitet, dass du nur noch klicken, kopieren und einfügen musst. Der Rest liegt bei mir.
**Schick mir die Ergebnisse einfach im Chat**, z. B. „E-Mail: …, Stripe fix: …“. Ich baue alles ein.

---

## Block 1: Go-live (ca. 25 Min.) 🔴 blockiert jeden Umsatz

- [ ] **1. Marken-E-Mail anlegen** (kostenlos, z. B. Gmail): Vorschlag `nodewise.automation@gmail.com` oder ähnlich.
  → Schick mir die Adresse.
- [ ] **2. Impressum-Daten des Verkäufers (WSD)**: Name bzw. Firma und Rechtsform, Anschrift, ggf. vertretungsberechtigte Person, Registernummer, USt-IdNr.
  → Schick mir die Daten oder einen Link zum bestehenden WSD-Impressum. Ohne Impressum darf die Seite nicht live gehen.
- [ ] **3. Steuerstatus**: Regelbesteuert oder Kleinunternehmer? Davon hängen die Stripe-Beträge ab.
- [ ] **4. Stripe Payment Links (4 Stück)** nach [`sales/stripe-payment-links.md`](sales/stripe-payment-links.md) anlegen.
  → Schick mir die 4 URLs.
- [ ] **5. GitHub Pages einschalten**:
  1. Repo `wsd-bartek/ai-test` öffnen und auf **Settings → Pages** gehen.
  2. Unter *Source* die Option „Deploy from a branch“ wählen.
  3. Branch `claude/pensive-fermat-5pqh31`, Ordner `/docs` wählen und auf **Save** klicken.
  4. Die Seite ist dann nach 1–2 Minuten unter `https://wsd-bartek.github.io/ai-test/` erreichbar.
  5. **Erst einschalten, wenn das Impressum ausgefüllt ist** (Schritt 2). Ich sage dir Bescheid, sobald es so weit ist.

## Block 2: Verkaufskanäle (ca. 45 Min., einmalig) 🟡

Mit der Marken-E-Mail aus Schritt 1 legst du diese Accounts an. Die Texte findest du in [`sales/profiles.md`](sales/profiles.md).
- [ ] **6. n8n-Community-Account** auf community.n8n.io anlegen (Profil-Bio und Website eintragen).
- [ ] **7. Fiverr-Seller-Account** anlegen und **2 Gigs** nach [`sales/fiverr-gigs.md`](sales/fiverr-gigs.md) einstellen (EN und DE).
- [ ] **8. Kleinanzeigen**: gewerbliches Konto anlegen, 1 Anzeige nach [`sales/kleinanzeigen.md`](sales/kleinanzeigen.md) einstellen.
- [ ] **9. Optional:** Reddit- und Hacker-News-Account für die erlaubten Self-Promo-Threads (Texte in [`sales/proposals.md`](sales/proposals.md)).

## Block 3: Täglich (ca. 20–30 Min.) 🟢

- [ ] **Neue Gesuche finden**: Im n8n-Forum unter community.n8n.io/c/jobs und auf r/n8n bzw. r/forhire nach `[Hiring]` schauen. Passende Posts **in den Chat kopieren**, dann schreibe ich die Antwort plus Prototyp, und du postest sie.
- [ ] **Nachrichten weiterleiten**: Anfragen von E-Mail, Fiverr oder Kleinanzeigen in den Chat kopieren. Ich formuliere die Antwort bzw. das Angebot.
- [ ] **Bezahlte Aufträge**: Wenn Stripe eine Zahlung meldet, gibst du mir Bescheid. Ich liefere, du machst den Übergabe-Call.

---

## Was ich nicht tue (zur Sicherheit)

- Ich gebe kein Geld aus und schließe keine Abos ab.
- Ich nutze kein LinkedIn und kein Prospai, und ich schreibe niemanden unaufgefordert an.
- Ich lege keine Kundendaten im (öffentlichen) Repo ab.
- Ich mache keine Rechts- oder Steuerberatung. Die Leistungsbedingungen und die Datenschutzerklärung sind sorgfältige Vorlagen, aber **keine anwaltliche Prüfung**. Wenn du bei WSD eine Rechtsberatung oder einen Rechtstexte-Dienst nutzt, lass sie dort kurz gegenlesen.
