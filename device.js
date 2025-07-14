
export function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1025) return 'tablet';
  return 'desktop';
}

export function isMobile() {
  return window.innerWidth < 1025;
}

export function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth < 1025;
}

export function isDesktop() {
  return window.innerWidth >= 1025;
}
