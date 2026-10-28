/* =========================
   THEME TOGGLE
   ========================= */

const themeToggle = document.querySelector("#theme-toggle");
const STORAGE_KEY = "prime_pops_theme";

function applyTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  if (themeToggle) {
    const nextText = isDark ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.setAttribute("aria-label", nextText);
    themeToggle.setAttribute("title", nextText);
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const willBeDark = !document.body.classList.contains("dark-mode");
    applyTheme(willBeDark);
    try {
      localStorage.setItem(STORAGE_KEY, willBeDark ? "dark" : "light");
    } catch (e) {}
  });
}

/* =========================
   MOBILE MENU
   ========================= */

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

if (menuToggle && navLinks) {
  const menuIcon = menuToggle.querySelector(".menu-icon");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("menu-open");

    menuToggle.classList.toggle("is-open", isOpen);

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    if (menuIcon) menuIcon.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("menu-open");
      menuToggle.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      if (menuIcon) menuIcon.textContent = "☰";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("menu-open");
      menuToggle.classList.remove("is-open");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      if (menuIcon) menuIcon.textContent = "☰";
    }
  });
}

/* =========================
   HEADER SCROLL
   ========================= */

const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  function updateHeader() {
    siteHeader.classList.toggle("scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
