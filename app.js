// Detecta si estás en móvil
const isMobile = window.matchMedia("(max-width: 768px)").matches;
gsap.registerPlugin(ScrollTrigger);

// -----------------------------------
// 🫧 BURBUJAS (no se tocan)
const bubbles = document.querySelectorAll('.bubble');
bubbles.forEach((bubble, i) => {
  let goingOut = true;

  const animate = () => {
    const maxMove = 400;
    const x = (Math.random() - 0.5) * maxMove;
    const y = (Math.random() - 0.5) * maxMove;

    bubble.style.transition = 'transform 3s ease-in-out';
    bubble.style.transform = goingOut ? `translate(${x}px, ${y}px)` : 'translate(0, 0)';
    goingOut = !goingOut;
    setTimeout(animate, 2000);
  };

  setTimeout(animate, i * 1000);
});

// -----------------------------------
// 🍔 MENÚ HAMBURGUESA
const burguerMenu = document.querySelector('.menuIcon');
const mobileMenu = document.querySelector('.mobileMenu');
const navLinks = document.querySelectorAll('.mobileMenu a');

burguerMenu.addEventListener('click', () => {
  burguerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll', mobileMenu.classList.contains('active'));
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    burguerMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    // Solo previene el comportamiento si es un enlace interno
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// -----------------------------------
// 🔁 ANIMACIÓN CON SCROLL EN MOBILE
if (isMobile) {
    // Estados del sistema
    let currentState = 0; // 0: inicial, 1: animando, 2: scroll libre
    let isAnimating = false;

    // Elementos
    const banner = document.querySelector('.banner');
    const logo = document.querySelector('.logo');
    const lead = document.querySelector('.leadd');
    const heading = document.getElementById('mainHeading');
    const subTitle = document.querySelector('.bannerTitle3');

    // Configuración inicial
    heading.style.display = 'none';
   
    
    // IMPORTANTE: Deshabilitar scroll inicialmente
    document.body.style.overflow = 'hidden';

    // Configurar elementos para mejor rendimiento
    gsap.set([logo, lead, subTitle], {
        force3D: true,
        backfaceVisibility: 'hidden'
    });

    // Función para habilitar scroll libre
    function enableFreeScroll() {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }

    // Función para deshabilitar scroll libre
    function disableFreeScroll() {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }

    // Animación principal - Se ejecuta completa automáticamente
    function runMainAnimation() {
        if (isAnimating || currentState !== 0) return;
        
        isAnimating = true;
        currentState = 1;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentState = 2; // Ahora permite scroll libre
                enableFreeScroll();
                console.log("Animación completada - Scroll libre activado");
            }
        });

        // Secuencia completa de animación
        tl.to(logo, {
            opacity: 0,
            y: -100,
            scale: 1,
            duration: 1.2,
            ease: "power2.in"
        }, 0)
        .to(lead, {
            opacity: 1,
            y: "-25vh",
            scale: 1.1,
            duration: 1.2,
            ease: "back.out(1.7)",
           onStart: () => lead.classList.add('active')
        }, 1.6)
        .to(subTitle, {
            opacity: 0,
            y: 30,
            scale: 0.8,
            duration: 1.2,
            ease: "power2.in"
        }, 0.5)
        .to(lead, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
             
        }, "-=0.4");
    }

    // Animación de reversión - Volver al estado inicial
    function reverseAnimation() {
        if (isAnimating || currentState !== 2) return;
        
        isAnimating = true;
        
        // Deshabilitar scroll y volver al top
        disableFreeScroll();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentState = 0; // Volver al estado inicial
                console.log("Reversión completada - Estado inicial");
            }
        });

        // Secuencia de reversión
        tl.to(logo, {
            opacity: 1,
            y:0,
            duration: 1.8,
            ease: "power2.inOut"
        })
        .to(lead, {
            opacity: 0,
            y: 0,
            scale: 0.8,
            duration: 1.5,
            ease: "power2.in"
        }, 0)
        .to(subTitle, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "back.out(1.7)"
        }, 0.4);
    }

    // Manejar interacciones según el estado
    function handleInteraction(direction) {
        if (currentState === 0 && direction === 'down') {
            // Primer toque hacia abajo: activar animación
            runMainAnimation();
            return true;
        } else if (currentState === 2 && direction === 'up' && window.pageYOffset < 150) {
            // En scroll libre + cerca del top + hacia arriba: revertir
            reverseAnimation();
            return true;
        }
        return false; // No manejar, comportamiento normal
    }

    // Event listener para wheel (desktop y algunos móviles)
    function handleWheel(e) {
        const direction = e.deltaY > 0 ? 'down' : 'up';
        
        if (handleInteraction(direction)) {
            e.preventDefault();
            return false;
        }
        
        // Si no estamos en scroll libre, bloquear
        if (currentState !== 2) {
            e.preventDefault();
            return false;
        }
    }

    // Event listeners para touch (móvil)
    let touchStartY = 0;
    let touchStartTime = 0;
    let touchHasMoved = false;

    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        touchHasMoved = false;
    }

    function handleTouchMove(e) {
        touchHasMoved = true;
        
        // Si no estamos en scroll libre, prevenir el movimiento
        if (currentState !== 2 && !isAnimating) {
            e.preventDefault();
            return false;
        }
    }

    function handleTouchEnd(e) {
        if (isAnimating || !touchHasMoved) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        const touchDuration = Date.now() - touchStartTime;
        
        // Detectar swipe significativo y rápido
        if (Math.abs(touchDiff) > 60 && touchDuration < 400) {
            const direction = touchDiff > 0 ? 'down' : 'up';
            handleInteraction(direction);
        }
    }

    // Agregar event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Touch events en el banner
    banner.addEventListener('touchstart', handleTouchStart, { passive: true });
    banner.addEventListener('touchmove', handleTouchMove, { passive: false });
    banner.addEventListener('touchend', handleTouchEnd, { passive: true });

    // También en el documento para capturar todos los toques
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Prevenir scroll con teclado cuando no está en modo libre
    document.addEventListener('keydown', (e) => {
        if (currentState !== 2) {
            const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
            if (scrollKeys.includes(e.keyCode)) {
                e.preventDefault();
                return false;
            }
        }
    });

    // Manejar resize
    window.addEventListener('resize', () => {
        if (currentState === 0) {
            gsap.set(logo, { y: 0, x: 0 });
            gsap.set(lead, { opacity: 0, y: 0, scale: 1 });
            gsap.set(subTitle, { opacity: 1, y: 0, scale: 1 });
        }
    });

    // Debug: mostrar estado actual
    console.log("Sistema de scroll controlado inicializado");
    console.log("Estado inicial: Sin scroll libre");
}