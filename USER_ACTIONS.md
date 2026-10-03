# USER_ACTIONS.md: Was nur du tun kannst

Alles ist vorbereitet. Schick mir Ergebnisse oder Fragen einfach im Chat.

**Stand 2026-10-03:**
- ✅ Impressum ist ausgefüllt.
- ✅ Domain `wowora.de` ist eingetragen.
- ✅ Die Marke heißt jetzt **Wowora**.
- ✅ Steuerstatus: regelbesteuert (19 % USt.).
- ✅ Bis Stripe steht, läuft die Bezahlung auf Rechnung.

---

## Block 1: Go-live (ca. 15 Min.) 🔴

- [ ] **1. E-Mail `hallo@wowora.de` einrichten.**
  Die Domain nutzt bereits Microsoft 365. So richtest du die Adresse ein:
  1. Im Microsoft 365 Admin Center auf **Benutzer → Aktive Benutzer** gehen und dein Konto auswählen.
  2. Unter **E-Mail-Aliase verwalten** den Alias `hallo@wowora.de` hinzufügen. Das ist kostenlos.

  Willst du lieber eine andere Adresse nutzen? Dann sag mir, welche. Die Adresse steht im Impressum und muss funktionieren.

- [ ] **2. GitHub Pages einschalten.**
  1. Im Repo `wsd-bartek/ai-test` auf **Settings → Pages** gehen.
  2. Bei *Source* „Deploy from a branch“ wählen, dann Branch `claude/pensive-fermat-5pqh31` und Ordner `/docs`. Mit **Save** bestätigen.
  3. Bei *Custom domain* `wowora.de` eintragen und auf **Save** klicken.
  4. Sobald das Zertifikat da ist (einige Minuten bis wenige Stunden), **Enforce HTTPS** anhaken.

- [ ] **3. DNS bei GoDaddy umstellen** (Domain → DNS verwalten).
  ⚠️ `wowora.de` zeigt aktuell auf **Lovable** (`185.158.133.1`). Nach der Umstellung ist die dortige Seite nicht mehr unter wowora.de erreichbar. Die **E-Mail-Einträge (MX, TXT/SPF) nicht anfassen**, dann läuft E-Mail normal weiter.

  | Typ | Name | Wert | Aktion |
  |---|---|---|---|
  | A | `@` | `185.158.133.1` | **löschen** |
  | A | `@` | `185.199.108.153` | neu |
  | A | `@` | `185.199.109.153` | neu |
  | A | `@` | `185.199.110.153` | neu |
  | A | `@` | `185.199.111.153` | neu |
  | A | `www` | `185.158.133.1` | **löschen** |
  | CNAME | `www` | `wsd-bartek.github.io` | neu |

  Die Umstellung braucht meist 10–60 Minuten. Danach prüfe ich, ob alles läuft.

- [ ] **4. USt-IdNr.:** Hast du eine? Falls ja, schick sie mir, denn dann muss sie ins Impressum.
  Deine **Steuernummer** brauche ich erst für die erste Rechnung. Die kommt nie ins öffentliche Repo.

## Block 2: Stripe (ca. 25 Min., parallel möglich) 🟡

- [ ] **5. Neues Stripe-Konto für Wowora und 4 Zahlungslinks** nach [`sales/stripe-payment-links.md`](sales/stripe-payment-links.md) anlegen.
  Das muss der Inhaber selbst machen (Identitätsprüfung). Danach schickst du mir die 4 Links.

## Block 3: Verkaufskanäle (ca. 45 Min., einmalig) 🟡

Mit `hallo@wowora.de` legst du diese Accounts an. Die Texte findest du in [`sales/profiles.md`](sales/profiles.md).
- [ ] **6. Fiverr-Seller-Account** anlegen und 2 Gigs nach [`sales/fiverr-gigs.md`](sales/fiverr-gigs.md) einstellen. Das ist der wichtigste Kanal (siehe L08).
- [ ] **7. n8n-Community-Account** anlegen und **einmal** den Post aus [`sales/proposals.md`](sales/proposals.md) (Abschnitt „n8n-Forum“) in der Kategorie *Jobs* veröffentlichen.
- [ ] **8. Kleinanzeigen**: gewerbliches Konto anlegen und 1 Anzeige nach [`sales/kleinanzeigen.md`](sales/kleinanzeigen.md) einstellen.

## Block 4: Täglich (ca. 15–20 Min.) 🟢

- [ ] **Postfach und Fiverr checken.** Anfragen kopierst du in den Chat. Ich formuliere die Antwort bzw. das Angebot.
- [ ] **Gesuche:** Ich prüfe jeden Morgen den Lead-Radar (`leads/radar.md`) und lege Antwortentwürfe in `leads/drafts/` ab. Du postest sie.
- [ ] **Aufträge:** Sobald eine Buchung kommt, sagst du mir Bescheid. Ich erstelle Rechnung und Lieferung, du machst den Übergabe-Call.

---

## Was ich nicht tue (zur Sicherheit)

- Ich gebe kein Geld aus und lege keine Konten in deinem Namen an.
- Ich nutze kein LinkedIn und kein Prospai, und ich schreibe niemanden unaufgefordert an.
- Ich lege keine Kundendaten und keine Steuernummer im (öffentlichen) Repo ab.
- Ich mache keine Rechts- oder Steuerberatung. Datenschutzerklärung und Leistungsbedingungen sind sorgfältige Vorlagen, aber **keine anwaltliche Prüfung**.
