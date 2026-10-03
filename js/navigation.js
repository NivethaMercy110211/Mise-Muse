/* ==========================================================================
   MISE & MUSE - NAVIGATION, AUTH HEADER CONTROLLER & THEME/RTL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalBranding();
  initGlobalFooter();
  syncResponsiveMenuNames();
  initActiveNavigation();
  initLiveStrip();
  initStickyHeader();
  initAuthPageControls();
  initThemeToggle();
  initRtlToggle();
  initMobileDrawer();
  renderAuthHeaderControls();

  window.addEventListener('miseStateChanged', () => {
    initLiveStrip();
    renderAuthHeaderControls();
  });
});

function initAuthPageControls() {
  const authPane = document.querySelector('.auth-form-pane');
  if (!authPane || authPane.querySelector('.auth-top-controls')) return;

  const controls = document.createElement('div');
  controls.className = 'auth-top-controls';
  controls.setAttribute('aria-label', 'Display controls');
  controls.innerHTML = `
    <button class="control-btn theme-toggle-btn" type="button" aria-label="Toggle theme"></button>
    <button class="control-btn rtl-toggle-btn" type="button" aria-label="Switch to right-to-left layout">RTL</button>
  `;
  authPane.prepend(controls);
}

function syncResponsiveMenuNames() {
  const menuItems = [
    ['index.html', 'Home 1'],
    ['home-journey.html', 'Home 2'],
    ['about.html', 'About'],
    ['classes.html', 'Classes'],
    ['schedule.html', 'Schedule'],
    ['gift-experiences.html', 'Gift Experiences'],
    ['corporate-events.html', 'Corporate'],
    ['contact.html', 'Contact'],
    ['dashboard.html', 'Dashboard']
  ];

  // Every responsive drawer uses the same labels and order as the desktop menu.
  document.querySelectorAll('.drawer-nav').forEach(nav => {
    nav.setAttribute('aria-label', 'Mobile navigation');
    nav.innerHTML = menuItems
      .map(([href, label]) => `<a href="${href}" class="nav-link">${label}</a>`)
      .join('');
  });
}

function initGlobalFooter() {
  document.querySelectorAll('.site-footer').forEach(footer => {
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand-col">
            <a href="index.html" class="footer-brand-name brand-logo" aria-label="Mise &amp; Muse — Cook. Create. Gather. — Home">
              ${brandMarkup()}
            </a>
            <p class="footer-desc">Contemporary culinary studio dedicated to technique-driven workshops and communal dining.</p>
            <div class="footer-socials" aria-label="Social media">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z"></path></svg>
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.5a3 3 0 0 0-2-2C17.2 6 12 6 12 6s-5.2 0-7 .5a3 3 0 0 0-2 2A20 20 0 0 0 3 15.5a3 3 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a3 3 0 0 0 2-2 20 20 0 0 0 0-7Z"></path><path d="m10 9 5 3-5 3Z"></path></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 class="footer-nav-title">Navigation</h4>
            <ul class="footer-nav-list">
              <li><a href="index.html">Home 1 — Discovery</a></li>
              <li><a href="home-journey.html">Home 2 — Journey</a></li>
              <li><a href="classes.html">Classes Catalog</a></li>
              <li><a href="schedule.html">Live Schedule</a></li>
            </ul>
          </div>
          <div>
            <h4 class="footer-nav-title">Studio</h4>
            <ul class="footer-nav-list">
              <li><a href="about.html">About Us</a></li>
              <li><a href="corporate-events.html">Corporate Events</a></li>
              <li><a href="gift-experiences.html">Gift Experiences</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-contact-col">
            <h4 class="footer-nav-title">Visit &amp; Contact</h4>
            <address class="footer-address">
              <span class="footer-contact-item">
                <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>
                <span>42 Artisan Row, Culinary Quarter<br>San Francisco, CA 94107</span>
              </span>
              <a class="footer-contact-item" href="tel:+15553826873">
                <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.7.5 2.6.6a2 2 0 0 1 2 2.4Z"></path></svg>
                <span>+1 (555) 382-6873</span>
              </a>
              <a class="footer-contact-item" href="mailto:hello@miseandmuse.com">
                <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg>
                <span>hello@miseandmuse.com</span>
              </a>
            </address>
          </div>
        </div>
        <div class="footer-bottom">
          <div>&copy; 2026 Mise &amp; Muse Culinary Studio. Cook. Create. Gather.</div>
        </div>
      </div>
    `;
  });
}

function brandMarkup() {
  return '<img src="assets/logo.png" alt="Mise &amp; Muse Logo" class="brand-logo-img"><span class="brand-text"><span class="brand-name">Mise <span class="brand-amp">&amp;</span> Muse</span><span class="brand-tagline">Cook. Create. Gather.</span></span>';
}

function initGlobalBranding() {
  document.querySelectorAll('.brand-logo').forEach(brand => {
    brand.setAttribute('href', 'index.html');
    brand.setAttribute('aria-label', 'Mise & Muse — Cook. Create. Gather. — Home');
    brand.innerHTML = brandMarkup();
  });

  document.querySelectorAll('.footer-brand-name').forEach(brand => {
    brand.classList.add('brand-logo');
    brand.setAttribute('href', 'index.html');
    brand.setAttribute('aria-label', 'Mise & Muse — Cook. Create. Gather. — Home');
    brand.innerHTML = brandMarkup();
  });

  // Set browser icon / favicon
  let favicon = document.querySelector('link[rel="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  favicon.href = 'assets/logo.png';
  favicon.type = 'image/png';

  let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (!appleIcon) {
    appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    document.head.appendChild(appleIcon);
  }
  appleIcon.href = 'assets/logo.png';
}

function initActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav .nav-link, .drawer-nav .nav-link').forEach(link => {
    const target = (link.getAttribute('href') || '').split('?')[0];
    const active = target === currentPage;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

// Keep the same public-page actions regardless of saved student session state.
function renderAuthHeaderControls() {
  const actionsContainer = document.querySelector('.header-actions');
  if (!actionsContainer || !window.MiseState) return;

  // The student portal has its own compact account control and dashboard drawer.
  if (document.body.classList.contains('dashboard-page')) {
    initDashboardAccountMenu();
    return;
  }

  const authButtonsHtml = `
    <a href="dashboard.html" class="btn btn-primary btn-sm" id="btnHeaderMyClasses">Dashboard</a>
    <a href="login.html" class="btn btn-outline btn-sm header-login-btn">Login</a>
  `;

  // Preserve theme, RTL, and mobile toggle controls
  const themeBtn = actionsContainer.querySelector('.theme-toggle-btn');
  const rtlBtn = actionsContainer.querySelector('.rtl-toggle-btn');
  const mobileToggle = actionsContainer.querySelector('.mobile-toggle');

  actionsContainer.innerHTML = authButtonsHtml;
  if (themeBtn) actionsContainer.appendChild(themeBtn);
  if (rtlBtn) actionsContainer.appendChild(rtlBtn);
  if (mobileToggle) actionsContainer.appendChild(mobileToggle);

  initThemeToggle();
  initRtlToggle();
  initMobileDrawer();
}

function initDashboardAccountMenu() {
  const account = document.querySelector('.dashboard-account');
  const trigger = account?.querySelector('.dashboard-account-trigger');
  const menu = account?.querySelector('.dashboard-account-menu');
  if (!account || !trigger || !menu) return;

  const student = window.MiseState?.getStudent?.() || {};
  document.querySelectorAll('.student-avatar-text').forEach(el => { el.textContent = student.initials || 'EV'; });
  document.querySelectorAll('.student-name-text').forEach(el => { el.textContent = student.name || 'Elena Vance'; });
  document.querySelectorAll('.student-level-text').forEach(el => { el.textContent = student.level || 'Confident Cook'; });

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.onclick = event => {
    event.stopPropagation();
    const willOpen = menu.hidden;
    menu.hidden = !willOpen;
    trigger.setAttribute('aria-expanded', String(willOpen));
  };

  menu.querySelector('[data-account-action="account"]')?.addEventListener('click', () => {
    closeMenu();
    if (typeof window.switchDashboardTab === 'function') {
      window.switchDashboardTab('tabAccount');
    } else {
      window.location.href = 'dashboard.html#account';
    }
  });
  menu.querySelector('[data-account-action="settings"]')?.addEventListener('click', () => {
    closeMenu();
    if (typeof window.switchDashboardTab === 'function') {
      window.switchDashboardTab('tabSettings');
    } else {
      window.location.href = 'dashboard.html#settings';
    }
  });

  if (!account.dataset.outsideHandler) {
    document.addEventListener('click', event => {
      if (!account.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    account.dataset.outsideHandler = 'true';
  }
}

// Live "What's Cooking Next" Top Strip
function initLiveStrip() {
  const stripEl = document.getElementById('liveCookingStrip');
  if (!stripEl || !window.MiseState) return;

  const nextClass = window.MiseState.getNextClassInfo();
  if (nextClass) {
    const seatsRemaining = nextClass.capacity - nextClass.bookedSeats;
    const dateFormatted = new Date(nextClass.upcomingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    stripEl.innerHTML = `
      <div class="live-strip-content">
        <span class="live-indicator"><span class="live-pulse"></span> Next Session</span>
        <span><strong>${nextClass.title}</strong> · ${dateFormatted} · </span>
        <span class="seat-pill ${seatsRemaining <= 3 ? 'status-few' : 'status-available'}">${seatsRemaining} seats remaining</span>
        <a href="class-detail.html?id=${nextClass.id}" class="live-strip-link">Reserve Seat →</a>
      </div>
    `;
  }
}

// Sticky Header Glass Effect on Scroll
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Dark Mode Controller
function updateBrandLogos(theme) {
  const isDark = theme === 'dark';
  document.querySelectorAll('.brand-logo-img').forEach(img => {
    img.src = isDark ? 'assets/logo-dark.png' : 'assets/logo.png';
  });
}

function initThemeToggle() {
  const currentTheme = localStorage.getItem('mise_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateBrandLogos(currentTheme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    const renderThemeButton = theme => {
      const switchingToDark = theme !== 'dark';
      btn.innerHTML = switchingToDark
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41"></path></svg>';
      btn.setAttribute('aria-label', switchingToDark ? 'Switch to dark theme' : 'Switch to light theme');
      btn.setAttribute('title', switchingToDark ? 'Dark theme' : 'Light theme');
    };

    renderThemeButton(currentTheme);
    btn.onclick = () => {
      const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', active);
      localStorage.setItem('mise_theme', active);
      updateBrandLogos(active);
      document.querySelectorAll('.theme-toggle-btn').forEach(themeBtn => {
        const switchingToDark = active !== 'dark';
        themeBtn.innerHTML = switchingToDark
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41"></path></svg>';
        themeBtn.setAttribute('aria-label', switchingToDark ? 'Switch to dark theme' : 'Switch to light theme');
        themeBtn.setAttribute('title', switchingToDark ? 'Dark theme' : 'Light theme');
      });
    };
  });
}

// RTL / LTR Toggle Controller
function initRtlToggle() {
  const currentDir = localStorage.getItem('mise_direction') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);

  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlBtns.forEach(btn => {
    const updateDirectionButton = () => {
      const activeDirection = document.documentElement.getAttribute('dir') || 'ltr';
      btn.textContent = activeDirection === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', `Switch to ${activeDirection === 'rtl' ? 'left-to-right' : 'right-to-left'} layout`);
      btn.setAttribute('title', `Current layout: ${activeDirection.toUpperCase()}`);
    };

    updateDirectionButton();
    btn.onclick = () => {
      const current = document.documentElement.getAttribute('dir');
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('mise_direction', next);
      document.querySelectorAll('.rtl-toggle-btn').forEach(directionBtn => {
        directionBtn.textContent = next === 'rtl' ? 'LTR' : 'RTL';
        directionBtn.setAttribute('aria-label', `Switch to ${next === 'rtl' ? 'left-to-right' : 'right-to-left'} layout`);
        directionBtn.setAttribute('title', `Current layout: ${next.toUpperCase()}`);
      });
    };
  });
}

// Mobile Off-canvas Drawer
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!toggleBtn || !drawer || !backdrop) return;

  const isDashboard = document.body.classList.contains('dashboard-page');
  const menuName = isDashboard ? 'dashboard menu' : 'navigation menu';

  toggleBtn.innerHTML = '<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
  toggleBtn.setAttribute('aria-label', `Open ${menuName}`);
  toggleBtn.setAttribute('aria-controls', 'site-mobile-drawer');
  toggleBtn.setAttribute('aria-expanded', 'false');
  drawer.id = 'site-mobile-drawer';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', isDashboard ? 'Dashboard navigation' : 'Site navigation');

  const drawerHeader = drawer.querySelector('.drawer-header');
  let closeBtn = drawer.querySelector('.drawer-close-btn');
  if (drawerHeader && !closeBtn) {
    drawerHeader.insertAdjacentHTML('beforeend', '<button class="control-btn drawer-close-btn" type="button" aria-label="Close navigation menu" title="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></button>');
    closeBtn = drawer.querySelector('.drawer-close-btn');
  }

  if (!isDashboard) {
    let drawerFooter = drawer.querySelector('.drawer-footer');
    if (!drawerFooter) {
      drawer.insertAdjacentHTML('beforeend', '<div class="drawer-footer"></div>');
      drawerFooter = drawer.querySelector('.drawer-footer');
    }
    drawerFooter.innerHTML = '<a href="login.html" class="btn btn-outline btn-sm">Login</a><div class="drawer-controls"><button class="control-btn theme-toggle-btn" type="button" aria-label="Toggle theme"></button><button class="control-btn rtl-toggle-btn" type="button">RTL</button></div>';
    initThemeToggle();
    initRtlToggle();
  }

  function openDrawer() {
    toggleBtn.classList.add('active');
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', `Close ${menuName}`);
    drawer.querySelector('a, button')?.focus();
  }

  function closeDrawer() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', `Open ${menuName}`);
  }

  // Bind once even when account controls are re-rendered.
  if (!toggleBtn.dataset.drawerBound) {
    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
    toggleBtn.dataset.drawerBound = 'true';
  }

  if (!backdrop.dataset.drawerBound) {
    backdrop.addEventListener('click', closeDrawer);
    backdrop.dataset.drawerBound = 'true';
  }
  if (closeBtn && !closeBtn.dataset.drawerBound) {
    closeBtn.addEventListener('click', closeDrawer);
    closeBtn.dataset.drawerBound = 'true';
  }
  drawer.querySelectorAll('a, .dash-nav-item[data-tab]').forEach(link => {
    if (link.dataset.drawerBound) return;
    link.addEventListener('click', closeDrawer);
    link.dataset.drawerBound = 'true';
  });
  if (!document.documentElement.dataset.drawerKeyboardBound) {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
    document.documentElement.dataset.drawerKeyboardBound = 'true';
  }
}

// Toast Utility
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;
