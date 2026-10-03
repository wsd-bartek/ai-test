// Wowora: zentrale Konfiguration der Website.
// Nur diese Datei muss angepasst werden, wenn sich Links oder Kontaktdaten ändern.
// Leere Stripe-Links fallen automatisch auf eine Buchung per E-Mail (Zahlung auf Rechnung) zurück.
window.WOWORA = {
  contactEmail: "hallo@wowora.de",
  vatNote: {
    de: "Alle Preise netto zzgl. 19 % USt.",
    en: "All prices net, excl. 19 % German VAT where applicable."
  },
  stripe: {
    fix: "",                   // Stripe Payment Link "Workflow-Fix" (€99 netto)
    starter: "",               // Stripe Payment Link "Starter" (€290 netto)
    erechnung: "",             // Stripe Payment Link "E-Rechnung-Eingang" (€490 netto)
    sprint: ""                 // Stripe Payment Link "Sprint" (€890 netto)
  }
};
