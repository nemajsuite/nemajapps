/* NEMAJ APPS TECHNOLOGIES - business settings */
const BUSINESS_SETTINGS = {
  supportEmail: "nemajapps@gmail.com",
  chargebackEmail: "nemajapps@gmail.com",
  location: "Tudun Yola C Setlite Plaza, Tudun Yola C, Kano, Kano State, Nigeria",
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: ""
  }
};

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

document.querySelectorAll("[data-business-email]").forEach((element) => {
  element.textContent = BUSINESS_SETTINGS.supportEmail;
  element.href = `mailto:${BUSINESS_SETTINGS.supportEmail}`;
});
document.querySelectorAll("[data-chargeback-email]").forEach((element) => {
  element.textContent = BUSINESS_SETTINGS.chargebackEmail;
  element.href = `mailto:${BUSINESS_SETTINGS.chargebackEmail}`;
});
setText("[data-business-location]", BUSINESS_SETTINGS.location);
setText("[data-year]", new Date().getFullYear());

// Show only social profiles for which an official HTTPS URL has been configured.
document.querySelectorAll("[data-social]").forEach((element) => {
  const network = element.dataset.social;
  const url = BUSINESS_SETTINGS.social[network];
  if (url && /^https:\/\//i.test(url)) {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  } else {
    element.hidden = true;
  }
});

// Accessible mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// This static form opens the visitor's email application; it does not store submissions.
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Project enquiry: ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`);
    const status = document.querySelector("#form-status");
    if (status) status.textContent = "Your email application should open with the enquiry prepared. Please review and send it from your email account.";
    window.location.href = `mailto:${BUSINESS_SETTINGS.supportEmail}?subject=${subject}&body=${body}`;
  });
}
