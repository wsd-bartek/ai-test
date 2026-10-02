// Nodewise: zentrale Konfiguration der Website.
// Nur diese Datei muss angepasst werden, wenn sich Links oder Kontaktdaten ändern.
// Leere Stripe-Links fallen automatisch auf eine E-Mail-Anfrage zurück.
window.NODEWISE = {
  contactEmail: "",            // z. B. "nodewise.automation@gmail.com" (Pflicht vor Go-live)
  vatNote: {
    de: "Alle Preise netto zzgl. gesetzlicher USt.",
    en: "All prices net, excl. VAT where applicable."
  },
  stripe: {
    fix: "",                   // Stripe Payment Link "Workflow-Fix" (€99)
    starter: "",               // Stripe Payment Link "Starter" (€290)
    erechnung: "",             // Stripe Payment Link "E-Rechnung-Eingang" (€490)
    sprint: ""                 // Stripe Payment Link "Sprint" (€890)
  }
};
