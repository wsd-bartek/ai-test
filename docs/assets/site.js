// Verdrahtet Kauf- und Kontakt-Buttons anhand von config.js.
(function () {
  var cfg = window.WOWORA || {};
  var lang = document.documentElement.lang === "en" ? "en" : "de";
  var email = cfg.contactEmail || "";

  function mailto(subject, body) {
    if (!email) return "#kontakt";
    return "mailto:" + email + "?subject=" + encodeURIComponent(subject) +
      (body ? "&body=" + encodeURIComponent(body) : "");
  }

  document.querySelectorAll("[data-buy]").forEach(function (el) {
    var key = el.getAttribute("data-buy");
    var link = cfg.stripe && cfg.stripe[key];
    if (link) {
      el.href = link;
      el.rel = "noopener";
    } else {
      el.href = mailto(el.getAttribute("data-subject") || "Wowora", el.getAttribute("data-body") || "");
    }
  });

  document.querySelectorAll("[data-mail]").forEach(function (el) {
    el.href = mailto(el.getAttribute("data-subject") || "Wowora", el.getAttribute("data-body") || "");
  });

  document.querySelectorAll("[data-email-text]").forEach(function (el) {
    el.textContent = email || (lang === "en" ? "(email coming soon)" : "(E-Mail folgt)");
  });

  var online = cfg.stripe && Object.keys(cfg.stripe).some(function (k) { return !!cfg.stripe[k]; });
  document.querySelectorAll("[data-pay-note]").forEach(function (el) {
    el.textContent = online
      ? (lang === "en" ? "Pay online via Stripe (card, SEPA, Apple/Google Pay) or by invoice." : "Bezahlung online per Stripe (Karte, SEPA, Apple/Google Pay) oder auf Rechnung.")
      : (lang === "en" ? "Book by email, and you'll receive an invoice (bank transfer)." : "Buchung per E-Mail. Du erhältst eine Rechnung (Überweisung).");
  });

  document.querySelectorAll("[data-vat]").forEach(function (el) {
    if (cfg.vatNote && cfg.vatNote[lang]) el.textContent = cfg.vatNote[lang];
  });

  var y = document.querySelectorAll("[data-year]");
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
