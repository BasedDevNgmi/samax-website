(function () {
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('mobile-drawer');
  var main = document.querySelector('main');
  var footer = document.querySelector('.site-footer');
  var setDrawer = function (open) {
    drawer.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('drawer-open', open);
    [main, footer].forEach(function (el) {
      if (el) { if (open) el.setAttribute('aria-hidden', 'true'); else el.removeAttribute('aria-hidden'); }
    });
  };
  toggle.addEventListener('click', function () {
    setDrawer(!drawer.classList.contains('open'));
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setDrawer(false); });
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900 && drawer.classList.contains('open')) setDrawer(false);
  });

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add('no-io');
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // Anchor navigation (nav links, CTAs, footer links) can jump straight to a
    // section before the observer's own intersection check has settled, which
    // would otherwise leave that section's content stuck at opacity:0. Force
    // the destination's content visible immediately whenever an in-page link
    // is used, so nothing ever reads as a blank/broken section.
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        var id = a.getAttribute('href').slice(1);
        var target = id ? document.getElementById(id) : null;
        if (!target) return;
        target.querySelectorAll('.reveal').forEach(function (el) {
          el.classList.add('in-view');
          io.unobserve(el);
        });
      });
    });
  } else {
    document.documentElement.classList.add('no-io');
  }

  var form = document.getElementById('contact-form');
  var success = document.getElementById('success-panel');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.display = 'none';
    success.classList.add('visible');
    success.setAttribute('tabindex', '-1');
    success.focus();
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
