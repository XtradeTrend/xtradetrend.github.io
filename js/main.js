// main.js - small utilities for header and lazy images
document.addEventListener('DOMContentLoaded', function () {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  mobileBtn && mobileBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if(mainNav.classList.contains('open')) {
      mainNav.style.display = 'block';
    } else {
      mainNav.style.display = '';
    }
  });

  // lazy swap desktop/mobile hero images based on viewport
  const lazyEls = document.querySelectorAll('img.lazy, img[data-src]');
  const onIntersection = (entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        const src = img.getAttribute('data-src') || img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  };
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(onIntersection, {rootMargin:'200px'});
    lazyEls.forEach(el=>obs.observe(el));
  } else {
    // fallback
    lazyEls.forEach(el=>{
      const src = el.getAttribute('data-src') || el.dataset.src;
      if(src) el.src = src;
    });
  }

  // small sticky header/shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    });
  }
});
