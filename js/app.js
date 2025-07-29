import { contactCopy } from './contact.js';
import { initApp } from './coordScroll.js';
import { initMobile } from './mobile.js';

function isMobile() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth <= 768
  );
}






document.addEventListener('DOMContentLoaded', () => {



  initApp();

  initMobile();



  contactCopy();
  prepareLenguage();

 
});








function prepareLenguage() {
   
  const btnEn = document.getElementById('btn-en');
  const btnEs = document.getElementById('btn-es');
  

  if (btnEn) btnEn.addEventListener('click', () => changeLanguage('en'));
  if (btnEs) btnEs.addEventListener('click', () => changeLanguage('es'));

  // Detección automática solo si estamos en index.html
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    const userLang = navigator.language || navigator.userLanguage;
    const hasRedirected = sessionStorage.getItem('langRedirected');

    if (!hasRedirected) {
      if (userLang.startsWith('es')) {
        sessionStorage.setItem('langRedirected', 'true');
        window.location.href = 'index-es.html';
      }
    }
  }
  
}

function changeLanguage(lang) {
  if (lang === 'es') {
    window.location.href = 'index-es.html';
  } else {
    window.location.href = 'index.html';
  }
}