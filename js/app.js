import { contactCopy } from './contact.js';
import { initApp } from './coordScroll.js';
import { initMobile } from './mobile.js';
import { initEmailForm } from './email.js';

function isMobile() {
const ua = navigator.userAgent;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

}






document.addEventListener('DOMContentLoaded', () => {
console.log(isMobile());


  if (isMobile()) {
    initMobile();
    console.log("Mobile detected, initializing mobile app.");
    
  }else{
    initApp();
  }
  

  


 initEmailForm();

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