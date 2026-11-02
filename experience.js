/* Animate headings only when they enter the viewport; the text stays available without JS. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.animate(
        [{opacity: 0, transform: 'translate3d(0, 32px, 0)'}, {opacity: 1, transform: 'translate3d(0, 0, 0)'}],
        {duration: 850, easing: 'cubic-bezier(.22,1,.36,1)'}
      );
      obs.unobserve(entry.target);
    }
  }, {threshold: 0.12});
  document.querySelectorAll('main h1, main h2').forEach(heading => observer.observe(heading));
})();
