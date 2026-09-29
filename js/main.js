/* ==========================================================================
   MISE & MUSE - MAIN SCRIPT & SHARED INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSiteMotion();
  initKitchenHotspots();
  initHorizontalScrollRails();
  initFormValidationFeedback();
});

// Shared entrance motion for headers, banners, grids, auth pages, and dashboard views.
function initSiteMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.documentElement.classList.add('motion-enabled');

  const header = document.querySelector('.site-header');
  const liveStrip = document.querySelector('.live-cooking-strip');
  [liveStrip, header].forEach((element, index) => {
    if (!element) return;
    element.classList.add('motion-header');
    element.style.setProperty('--motion-delay', `${index * 80}ms`);
    requestAnimationFrame(() => element.classList.add('motion-visible'));
  });

  const revealElements = new Set();
  const addReveal = (element, variant = 'up', delay = 0) => {
    if (!element || revealElements.has(element)) return;
    revealElements.add(element);
    element.classList.add('motion-reveal', `motion-${variant}`);
    element.style.setProperty('--motion-delay', `${delay}ms`);
  };

  document.querySelectorAll('.banner-hero-copy, .hero-content, .class-hero-grid, .portal-view-head')
    .forEach(element => addReveal(element, 'banner'));

  document.querySelectorAll('.auth-media-pane').forEach(element => addReveal(element, 'left'));
  document.querySelectorAll('.auth-form-pane').forEach(element => addReveal(element, 'right', 100));
  document.querySelectorAll('.dashboard-sidebar').forEach(element => addReveal(element, 'left'));

  const gridSelectors = [
    '.classes-grid', '.gift-packages-grid', '.chef-spotlight-grid', '.student-proof-grid',
    '.curriculum-level-grid', '.take-home-grid', '.studio-detail-grid', '.mood-tiles-grid',
    '.moments-gallery-grid', '.what-you-cook-grid', '.class-preparation-grid',
    '.corporate-journey-grid', '.passport-grid', '.recipes-vault-grid',
    '.account-profile-grid', '.settings-grid', '.footer-grid'
  ];

  document.querySelectorAll(gridSelectors.join(',')).forEach(grid => {
    Array.from(grid.children).forEach((item, index) => addReveal(item, 'card', Math.min(index, 7) * 70));
  });

  document.querySelectorAll(
    '.signature-experience-item, .session-strip-card, .taste-passport-card, ' +
    '.next-class-hero-card, .account-card, .chef-note-card, .cta-banner-full, .contact-map-card'
  ).forEach((element, index) => addReveal(element, 'up', (index % 4) * 55));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealElements.forEach(element => observer.observe(element));
}

// Interactive Blueprint Hotspots on Home 1
function initKitchenHotspots() {
  const hotspotPins = document.querySelectorAll('.hotspot-pin');

  const alignMobilePopover = (item) => {
    const popover = item?.querySelector('.hotspot-popover');
    const blueprint = item?.closest('.kitchen-blueprint-wrap');
    if (!popover || !blueprint) return;

    if (window.matchMedia('(max-width: 767px)').matches) {
      const itemRect = item.getBoundingClientRect();
      const blueprintRect = blueprint.getBoundingClientRect();
      const centeredLeft = blueprintRect.left + (blueprintRect.width / 2) - itemRect.left;
      popover.style.setProperty('--mobile-popover-left', `${centeredLeft}px`);
    } else {
      popover.style.removeProperty('--mobile-popover-left');
    }
  };

  hotspotPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = pin.closest('.hotspot-item');
      document.querySelectorAll('.hotspot-item').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });
      if (parent) {
        alignMobilePopover(parent);
        parent.classList.toggle('active');
      }
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.hotspot-item.active').forEach(alignMobilePopover);
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.hotspot-item').forEach(item => item.classList.remove('active'));
  });
}

// Horizontal Scroll Support
function initHorizontalScrollRails() {
  const rails = document.querySelectorAll('.class-rail-wrap');
  rails.forEach(rail => {
    let isDown = false;
    let startX;
    let scrollLeft;

    rail.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    });

    rail.addEventListener('mouseleave', () => isDown = false);
    rail.addEventListener('mouseup', () => isDown = false);
    rail.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      const walk = (x - startX) * 1.5;
      rail.scrollLeft = scrollLeft - walk;
    });
  });
}

// Generic Form Handler
function initFormValidationFeedback() {
  const contactForm = document.getElementById('studioContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.showToast('Your message has been sent to our culinary concierge.');
      alert('Thank you for reaching out to Mise & Muse. A studio host will contact you within 24 hours.');
      contactForm.reset();
    });
  }
}
