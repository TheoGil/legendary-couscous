function prefersReducedMotion() {
  const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
  console.log(mediaQueryList.matches);
  return mediaQueryList.matches;
}

export default prefersReducedMotion;
