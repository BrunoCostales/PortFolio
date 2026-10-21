import { contactCopy } from "./contact.js";
import { initApp } from "./coordScroll.js";
import { initMobile } from "./mobile.js";
import { initEmailForm } from "./email.js";
import { renderProjects } from "./projectCards.js";

function isMobile() {
  const ua = navigator.userAgent;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua
  );
}

document.addEventListener("DOMContentLoaded", () => {
  // Las tarjetas tienen que existir antes de medir el scroll horizontal
  renderProjects();
  if (isMobile() && window.innerWidth <= 768) {
    initMobile();
  } else {
    initApp();
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
    window.addEventListener("resize", checkZoomAndRefresh);
    window.addEventListener("load", checkZoomAndRefresh);
    function checkZoomAndRefresh() {
      const zoom = Math.round(window.devicePixelRatio * 100);
      if (zoom !== 100) {
        ScrollTrigger.refresh(); // 🔄 fuerza ajuste
      }
    }
  }
  initEmailForm();
  contactCopy();
  prepareLenguage();
});

function prepareLenguage() {
  const btnEn = document.getElementById("btn-en");
  const btnEs = document.getElementById("btn-es");

  if (btnEn) btnEn.addEventListener("click", () => changeLanguage("en"));
  if (btnEs) btnEs.addEventListener("click", () => changeLanguage("es"));

  // Detección automática solo si estamos en index.html
  if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/")
  ) {
    const userLang = navigator.language || navigator.userLanguage;
    const hasRedirected = sessionStorage.getItem("langRedirected");

    if (!hasRedirected) {
      if (userLang.startsWith("es")) {
        sessionStorage.setItem("langRedirected", "true");
        window.location.href = "index-es.html";
      }
    }
  }
}

function changeLanguage(lang) {
  if (lang === "es") {
    window.location.href = "index-es.html";
  } else {
    window.location.href = "index.html";
  }
}
