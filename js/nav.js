(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const openLabel = toggle.dataset.labelOpen || 'Open menu';
  const closeLabel = toggle.dataset.labelClose || 'Close menu';

  const close = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', openLabel);
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  const mql = window.matchMedia('(min-width: 721px)');
  mql.addEventListener('change', e => { if (e.matches) close(); });
})();
