function prefersReducedMotion() {
  const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQueryList.matches;
}

export default prefersReducedMotion;
