const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#top-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const opened = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!opened));
    toggle.setAttribute('aria-label', opened ? '메뉴 열기' : '메뉴 닫기');
    nav.classList.toggle('is-open', !opened);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded','false');
    nav.classList.remove('is-open');
  }));
}


// Subtle one-time reveal: do not fetch or insert text on scroll.
// No effects for reduced-motion users, unsupported browsers, or visible first-screen content.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll([
    '.section-heading', '.service-card', '.industry-card', '.region-card',
    '.navy-grid > div', '.steps-list > div', '.funding-grid > div',
    '.faq-grid > div', '.closing-cta-inner > div', '.hub-how-list > div',
    '.article-block', '.article-faq', '.related-grid > a'
  ].join(','));
  const bottomOfInitialScreen = window.innerHeight * 0.85;
  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('scroll-reveal-pending');
        entry.target.addEventListener('transitionend', () => { entry.target.style.willChange = 'auto'; }, { once: true });
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.07, rootMargin: '0px 0px 42px 0px' });
  for (const target of targets) {
    if (target.getBoundingClientRect().top > bottomOfInitialScreen) {
      target.classList.add('scroll-reveal', 'scroll-reveal-pending');
      observer.observe(target);
    }
  }
}
