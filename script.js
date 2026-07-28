(function () {
  var root = document.documentElement;
  var toggle = document.querySelector('[data-theme-toggle]');

  var SUN =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  var MOON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  var mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function apply() {
    root.setAttribute('data-theme', mode);
    if (!toggle) return;
    toggle.innerHTML = mode === 'dark' ? SUN : MOON;
    toggle.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
  }
  apply();

  if (toggle) {
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      apply();
    });
  }

  // Sticky header hairline once scrolled
  var header = document.querySelector('.header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('header--scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Scroll reveal
  var targets = document.querySelectorAll(
    '.section-head, .col-text, .col-media, .card, .amenities li, .ccard, .band__inner > *, .contact-foot > *'
  );
  if ('IntersectionObserver' in window) {
    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    Array.prototype.forEach.call(targets, function (el) {
      io.observe(el);
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
