let touchStartY = 0;
let touchEndY = 0;

export function initTouchScroll(lenis) {
  const home = document.querySelector('#home');
  const about = document.querySelector('#about');
  if (!home || !about) return;

  let isAnimating = false;

  function onTouchStart(e) {
    touchStartY = e.changedTouches[0].screenY;
  }

  function onTouchEnd(e) {
    touchEndY = e.changedTouches[0].screenY;
    const deltaY = touchStartY - touchEndY;

    const scrollY = window.scrollY;
    const homeTop = home.offsetTop;
    const aboutTop = about.offsetTop;

    const inHome = scrollY >= homeTop && scrollY < aboutTop;
    const inAbout = scrollY >= aboutTop && scrollY < aboutTop + about.offsetHeight;

    if (isAnimating || Math.abs(deltaY) < 30) return;

    if (deltaY > 30 && inHome) {
      // swipe up → ir a about
      isAnimating = true;
      lenis.scrollTo(about, {
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: true,
        onComplete: () => {
          isAnimating = false;
        },
      });
    }

    if (deltaY < -30 && inAbout) {
      // swipe down → volver a home
      isAnimating = true;
      lenis.scrollTo(home, {
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: true,
        onComplete: () => {
          isAnimating = false;
        },
      });
    }
  }

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
}
