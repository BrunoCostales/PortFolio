// mobileScroll.js con Lenis

export function initializeMobileScroll() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;
        
    let currentState = 0;
    let isAnimating = false;

    const body = document.body;
    const html = document.documentElement;
    const banner = document.querySelector('.banner');
    const logo = document.querySelector('.logo');
    const lead = document.querySelector('.leadd');
    const heading = document.getElementById('mainHeading');
    const subTitle = document.querySelector('.bannerTitle3');

    // Set inicial
 
    gsap.set(lead, {
        transform: 'translateY(0px) scale(1)',
        opacity: 0,
        force3D: true,
        backfaceVisibility: 'hidden'
    });
    gsap.set(subTitle, {
        transform: 'translateY(0px) scale(1)',
        opacity: 1,
        force3D: true,
        backfaceVisibility: 'hidden'
    });

    const enableScroll = () => {
        body.style.overflow = 'auto';
        html.style.overflow = 'auto';
        document.documentElement.style.overscrollBehavior = 'auto';
        document.body.style.overscrollBehavior = 'auto';
    };

    const disableScroll = () => {
        if (!banner || !banner.contains(document.activeElement)) return;
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        document.documentElement.style.overscrollBehavior = 'none';
        document.body.style.overscrollBehavior = 'none';
    };

    const runMainAnimation = () => {
        if (isAnimating || currentState !== 0) return;
        isAnimating = true;
        currentState = 1;

        gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentState = 2;
                enableScroll();
                console.log("Animación completada - Scroll libre activado");
            }
        })
        .to(lead, {
            opacity: 1,
            transform: 'translateY(-25vh) scale(1.1)',
            duration: 1.2,
            ease: "back.out(1.7)",
            onStart: () => lead.classList.add('active')
        }, 0.4)
        .to(subTitle, {
            opacity: 0,
            transform: 'translateY(30px) scale(0.8)',
            duration: 1.2,
            ease: "power2.in"
        }, 0.4)
        .to(lead, {
            transform: 'translateY(-25vh) scale(1)',
            duration: 1,
            ease: "power2.out"
        }, "-=0.4");
    };

    const reverseAnimation = () => {
        if (isAnimating || currentState !== 2) return;
        isAnimating = true;
        disableScroll();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                currentState = 0;
                console.log("Reversión completada - Estado inicial");
            }
        })
        .to(logo, {
            opacity: 1,
            transform: 'translateY(0px)',
            duration: 1.8,
            ease: "power2.inOut"
        })
        .to(lead, {
            opacity: 0,
            transform: 'translateY(0px) scale(0.8)',
            duration: 1.5,
            ease: "power2.in"
        }, 0)
        .to(subTitle, {
            opacity: 1,
            transform: 'translateY(0px) scale(1)',
            duration: 1.5,
            ease: "back.out(1.7)"
        }, 0.4);
    };

    const handleInteraction = (direction) => {
        if (currentState === 0 && direction === 'down') {
            runMainAnimation();
            return true;
        } else if (currentState === 2 && direction === 'up' && window.pageYOffset < 50) {
            reverseAnimation();
            // Prevenir scroll al revertir animación
            disableScroll();
            // Aplicar overscroll-behavior y touch-action para evitar pull-to-refresh y overscroll
            return true;
        }
        return false;
    };

    let touchStartY = 0;
    let touchStartTime = 0;
    let touchHasMoved = false;

    const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        touchHasMoved = false;
    };

    const handleTouchMove = (e) => {
        touchHasMoved = true;
        // Prevent pull-to-refresh when at the top and in initial state
         if (
        currentState === 0 &&
        !isAnimating &&
        window.pageYOffset <= 0 &&
        e.touches[0].clientY > touchStartY
    ) {
        // Permite el pull-to-refresh (no hacemos preventDefault)
        return;
    }
    // En cualquier otro caso, previene el scroll (por ejemplo, para bloquear durante animación o después)
    if ((currentState !== 2 && !isAnimating) || (window.pageYOffset <= 0 && e.touches[0].clientY > touchStartY)) {
        e.preventDefault();
        console.log("Preventing pull-to-refresh");
    }
        
    };

    const handleTouchEnd = (e) => {
        if (isAnimating || !touchHasMoved) return;
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        const duration = Date.now() - touchStartTime;
        if (Math.abs(diff) > 60 && duration < 1000) {
            handleInteraction(diff > 0 ? 'down' : 'up');
        }
    };

    // Inicializar el estado
    ['touchstart', 'touchend'].forEach(event =>
        [banner, document].forEach(el =>
            el.addEventListener(event, event === 'touchstart' ? handleTouchStart : handleTouchEnd, { passive: true })
        )
    );
    ['touchmove'].forEach(event =>
        [banner, document].forEach(el =>
            el.addEventListener(event, handleTouchMove, { passive: false })
        )
    );

    console.log("Sistema de scroll controlado inicializado");
    console.log("Estado inicial: Sin scroll libre");}