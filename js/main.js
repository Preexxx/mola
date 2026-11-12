// Motion copied from the Figma Motion timeline: each element fades 0→1 and rises
// from its offset to 0 over 0.65s, easing cubic-bezier(.22,1,.36,1), at its own start time.
// Hero plays on load with the original times; lower sections play when scrolled into view,
// keeping their original stagger relative to the first element of the section.
(() => {
  if (!('animate' in Element.prototype)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const DUR = 650;
  const parse = el => el.dataset.reveal.split(',').map(Number);
  const play = (el, delayS) => {
    const [, dy] = parse(el);
    el.style.opacity = '';
    el.animate(
      [{ opacity: 0, transform: `translateY(${dy}px)` }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: DUR, delay: Math.max(0, delayS) * 1000, easing: EASE, fill: 'backwards' }
    );
  };

  // Hero and navigation: absolute timeline on load.
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (!el.closest('[data-group]')) play(el, parse(el)[0]);
  });

  // Sections: relative timeline on entering the viewport.
  const groups = [...document.querySelectorAll('[data-group]')];
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      const items = [...entry.target.querySelectorAll('[data-reveal]')];
      const start = Math.min(...items.map(el => parse(el)[0]));
      items.forEach(el => play(el, parse(el)[0] - start));
    });
  }, { threshold: 0.15 });
  groups.forEach(g => {
    const r = g.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      const items = [...g.querySelectorAll('[data-reveal]')];
      const start = Math.min(...items.map(el => parse(el)[0]));
      items.forEach(el => play(el, parse(el)[0] - start));
      return;
    }
    g.querySelectorAll('[data-reveal]').forEach(el => { el.style.opacity = '0'; });
    io.observe(g);
  });
})();
