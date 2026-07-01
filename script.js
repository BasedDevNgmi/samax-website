(function () {
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var toggle = document.getElementById('nav-toggle');
  var drawer = document.getElementById('mobile-drawer');
  var setDrawer = function (open) {
    drawer.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', function () {
    setDrawer(!drawer.classList.contains('open'));
  });
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setDrawer(false); });
  });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.documentElement.classList.add('no-io');
  }

  var form = document.getElementById('contact-form');
  var success = document.getElementById('success-panel');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.display = 'none';
    success.classList.add('visible');
  });

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
