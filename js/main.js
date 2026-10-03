/* ==========================================================================
   MISE & MUSE - MAIN SCRIPT & SHARED INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSiteMotion();
  initKitchenHotspots();
  initHorizontalScrollRails();
  initFormValidationFeedback();
  initPasswordToggles();
  initBackToTopButton();
});

// Public pages only: reveal a keyboard-accessible shortcut after the user scrolls.
function initBackToTopButton() {
  const excludedPages = new Set([
    'dashboard.html',
    'login.html',
    'register.html',
    'forgot-password.html'
  ]);
  const currentPage = window.location.pathname.split('/').pop().toLowerCase();
  if (excludedPages.has(currentPage) || document.body.classList.contains('dashboard-page')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.setAttribute('title', 'Back to top');
  button.setAttribute('aria-hidden', 'true');
  button.tabIndex = -1;
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 14 6-6 6 6"></path>
    </svg>
  `;
  document.body.appendChild(button);

  const updateVisibility = () => {
    const isVisible = window.scrollY > 420;
    button.classList.toggle('is-visible', isVisible);
    button.setAttribute('aria-hidden', String(!isVisible));
    button.tabIndex = isVisible ? 0 : -1;
  };

  button.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();
}

// Accessible show/hide controls for every password field on auth forms.
function initPasswordToggles() {
  document.querySelectorAll('input[type="password"]').forEach(input => {
    if (input.parentElement?.classList.contains('password-field')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'password-field';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'password-toggle';
    toggle.setAttribute('aria-label', 'Show password');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.title = 'Show password';
    toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    wrapper.appendChild(toggle);

    toggle.addEventListener('click', () => {
      const isVisible = input.type === 'text';
      input.type = isVisible ? 'password' : 'text';
      const action = isVisible ? 'Show password' : 'Hide password';
      toggle.setAttribute('aria-label', action);
      toggle.setAttribute('aria-pressed', String(!isVisible));
      toggle.title = action;
      toggle.classList.toggle('is-visible', !isVisible);
    });
  });
}
window.initPasswordToggles = initPasswordToggles;

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
    '.moments-gallery-grid', '.stat-photo-grid', '.journey-gallery-grid', '.what-you-cook-grid',
    '.class-preparation-grid', '.corporate-journey-grid', '.passport-grid', '.recipes-vault-grid',
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

// Single-row responsive card slider without a native horizontal scrollbar.
function initHorizontalScrollRails() {
  const rails = document.querySelectorAll('.class-rail-wrap');
  rails.forEach(rail => {
    const cards = [...rail.querySelectorAll('.rail-card')];
    const section = rail.closest('.section');
    const previousButton = section?.querySelector('.class-grid-prev');
    const nextButton = section?.querySelector('.class-grid-next');
    if (!cards.length || !previousButton || !nextButton) return;

    let currentIndex = 0;
    const visibleCardCount = () => {
      if (window.matchMedia('(max-width: 600px)').matches) return 1;
      if (window.matchMedia('(max-width: 1024px)').matches) return 2;
      return 4;
    };

    const renderCardWindow = (moveFocus = false) => {
      const visibleCount = visibleCardCount();
      const maxStart = Math.max(0, cards.length - visibleCount);
      currentIndex = Math.min(currentIndex, maxStart);

      cards.forEach((card, cardIndex) => {
        const isVisible = cardIndex >= currentIndex && cardIndex < currentIndex + visibleCount;
        card.classList.toggle('is-grid-hidden', !isVisible);
        card.setAttribute('aria-hidden', String(!isVisible));
        card.inert = !isVisible;
        card.tabIndex = isVisible ? 0 : -1;
      });
      previousButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === maxStart;
      if (moveFocus) cards[currentIndex].focus({ preventScroll: true });
    };

    previousButton.addEventListener('click', () => {
      currentIndex -= 1;
      renderCardWindow(true);
    });
    nextButton.addEventListener('click', () => {
      currentIndex += 1;
      renderCardWindow(true);
    });
    window.addEventListener('resize', () => renderCardWindow(false));
    renderCardWindow(false);
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
