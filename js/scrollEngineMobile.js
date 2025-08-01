

export function scrollEngineMobile() {
  
  


  

  
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      id: "aboutTriggerMobile",
      trigger: '#about',
      start: 'top top',
      end: '+=120%',
      pin: true,
      scrub: 0.3,
      
      anticipatePin: 1,
      invalidateOnRefresh: true,
      ignoreMobileResize: true,
      toggleActions: 'play reverse play reverse',
   
    }
  });

  // Animaciones de About
  aboutTl.to('.Discover img', { opacity: 1, duration: 1 }, 0);
  aboutTl.to('.sillhoulleteBoxAbout img', { opacity: 0, duration: 1 }, 0);
  aboutTl.to('.navLinksAbout li a', { fontWeight:900, color:'rgba(255, 255, 255, 0.4)' }, 0);
  aboutTl.to(['.titleAbout', '.titleMe'], {
    opacity: 0, y: -20, duration: 1, display: 'none'
  }, 0);
  aboutTl.set('.hideblock', { display: 'block' });
  aboutTl.fromTo('.hideblock', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
  aboutTl.fromTo('#about', {
    backgroundColor: 'rgba(166, 60, 109, 0)'
  }, {
    backgroundColor: 'rgba(166, 60, 109, 1)',
    duration: 1.5,
    ease: 'power1.out'
  }, 0);



  
 
}
