/* ==========================================================================
   MISE & MUSE - STUDENT DASHBOARD & PORTAL WORKFLOW CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  const dashContainer = document.querySelector('.dashboard-layout');
  if (!dashContainer || !window.MiseState) return;

  const student = window.MiseState.getStudent();

  // Tab Switching
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const panes = document.querySelectorAll('.dash-tab-pane');

  function activateTab(target) {
    if (!target) return;
    navItems.forEach(n => n.classList.toggle('active', n.getAttribute('data-tab') === target));
    panes.forEach(p => p.classList.remove('active'));

    const activePane = document.getElementById(target);
    if (activePane) {
      activePane.classList.add('active');
    }
    closeDashboardDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.switchDashboardTab = activateTab;

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      activateTab(item.getAttribute('data-tab'));
    });
  });

  // Handle direct hash navigation (#account or #settings)
  const currentHash = window.location.hash.toLowerCase();
  if (currentHash === '#account') {
    activateTab('tabAccount');
  } else if (currentHash === '#settings') {
    activateTab('tabSettings');
  }

  renderStudentProfile(student);
  renderMyKitchen(student);
  renderPortalDiscoverClasses();
  renderTastePassport(student);
  renderRecipeVault(student);
  renderChefNotes(student);
  renderPastClasses(student);
  renderMyBookingsList(student);
  initAccountAndSettings(student);
  initLogoutConfirmation();

  // Re-render when state changes
  window.addEventListener('miseStateChanged', () => {
    const updated = window.MiseState.getStudent();
    renderStudentProfile(updated);
    renderMyKitchen(updated);
    renderTastePassport(updated);
    renderRecipeVault(updated);
    renderPastClasses(updated);
    renderMyBookingsList(updated);
    populateAccountAndSettings(updated);
  });
}

function initLogoutConfirmation() {
  const modal = document.getElementById('logoutConfirmModal');
  const cancelButton = document.getElementById('cancelLogoutButton');
  const confirmButton = document.getElementById('confirmLogoutButton');
  const triggers = document.querySelectorAll('[data-logout-trigger]');
  if (!modal || !cancelButton || !confirmButton || !triggers.length) return;

  let lastTrigger = null;

  function openModal(trigger) {
    lastTrigger = trigger;
    closeDashboardDrawer();
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.classList.add('logout-modal-open');
    cancelButton.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.hidden = true;
    document.body.classList.remove('logout-modal-open');
    lastTrigger?.focus();
  }

  triggers.forEach(trigger => trigger.addEventListener('click', () => openModal(trigger)));
  cancelButton.addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
  confirmButton.addEventListener('click', () => {
    window.MiseState.logout();
    window.location.href = 'login.html';
  });
}

function renderStudentProfile(student) {
  document.querySelectorAll('.student-name, .student-name-text').forEach(el => { el.innerText = student.name || 'Elena Vance'; });
  document.querySelectorAll('.student-avatar, .student-avatar-text').forEach(el => { el.innerText = student.initials || 'EV'; });
  document.querySelectorAll('.student-level, .student-level-text').forEach(el => { el.innerText = student.level || 'Confident Cook'; });
}

function closeDashboardDrawer() {
  const drawer = document.querySelector('.dashboard-mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const toggle = document.querySelector('.dashboard-menu-toggle');
  drawer?.classList.remove('open');
  backdrop?.classList.remove('active');
  toggle?.classList.remove('active');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open dashboard menu');
  document.body.style.overflow = '';
}

function renderMyKitchen(student) {
  const container = document.getElementById('myKitchenNextClass');
  if (!container) return;

  const activeBooking = student.bookings[0];
  if (!activeBooking) {
    container.innerHTML = `
      <div style="background-color:var(--bg-card); padding:3.5rem 2rem; border-radius:var(--radius-xl); border:1px dashed var(--border-color); text-align:center;">
        <h3 style="font-family:var(--font-serif); margin-bottom:0.5rem; font-size:1.8rem;">Your Kitchen Station is Ready</h3>
        <p style="color:var(--body-muted); margin-bottom:1.75rem; max-width:540px; margin-left:auto; margin-right:auto;">
          You currently have no active workshop bookings. Browse this week's live session drops and claim your dedicated workstation.
        </p>
        <button class="btn btn-primary" onclick="document.querySelector('.dash-nav-item[data-tab=tabDiscover]').click()">
          Discover & Book Classes →
        </button>
      </div>
    `;
    return;
  }

  const cls = window.MiseState.getClassById(activeBooking.classId);
  const imgUrl = cls ? cls.image : 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop';

  container.innerHTML = `
    <div class="next-class-hero-card">
      <div class="next-class-content">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
            <span class="badge badge-primary">Your Next Cooking Session</span>
            <span class="seat-pill status-available">Reference: ${activeBooking.id}</span>
          </div>
          <h2 style="font-size:clamp(1.5rem, 3vw, 2rem); margin-bottom:0.5rem;">${activeBooking.classTitle}</h2>
          <p style="color:var(--body-muted); font-size:0.92rem; margin-bottom:1rem;">
            Led by <strong>${activeBooking.chefName}</strong> · ${activeBooking.seats} Workstation(s) Reserved
          </p>
          
          <div style="display:flex; gap:1.25rem; font-size:0.88rem; color:var(--text-main); font-weight:600; margin-bottom:1rem; flex-wrap:wrap;">
            <span><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg> ${activeBooking.date}</span>
            <span><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> ${activeBooking.time}</span>
            <span><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></svg> ${activeBooking.studio}</span>
          </div>

          <div class="what-to-bring-box">
            <strong>What to Bring:</strong> ${activeBooking.whatToBring}
          </div>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:1.5rem;">
          <a href="confirmation.html?ref=${activeBooking.id}" class="btn btn-primary btn-sm">View Workstation Pass</a>
          <button class="btn btn-outline btn-sm" onclick="window.showToast('Workstation map and directions sent to your email.')">Get Directions</button>
          <button class="btn btn-ghost btn-sm" onclick="document.querySelector('.dash-nav-item[data-tab=tabRecipeVault]').click()" style="color:var(--primary); font-weight:700;">Prep Recipes →</button>
        </div>
      </div>
      <div class="next-class-media">
        <img src="${imgUrl}" alt="${activeBooking.classTitle}" class="next-class-img">
      </div>
    </div>
  `;
}

// IN-PORTAL DISCOVER CLASSES TAB
function renderPortalDiscoverClasses() {
  const container = document.getElementById('portalClassesGrid');
  if (!container) return;

  let portalCuisine = 'All';
  let portalDifficulty = 'All';

  function renderList() {
    const classes = window.MiseState.getClasses();
    const filtered = classes.filter(c => {
      const matchCuisine = portalCuisine === 'All' || c.cuisine.toLowerCase() === portalCuisine.toLowerCase();
      const matchDiff = portalDifficulty === 'All' || c.difficulty.toUpperCase() === portalDifficulty.toUpperCase();
      return matchCuisine && matchDiff;
    });

    container.innerHTML = filtered.map(c => {
      const avail = c.capacity - c.bookedSeats;
      return `
        <article class="class-card">
          <div class="class-card-media">
            <img src="${c.image}" alt="${c.title}" class="class-card-img">
            <div class="class-card-badges">
              <span class="seat-pill ${avail <= 3 ? 'status-few' : 'status-available'}">${avail} seats left</span>
              <span class="difficulty-pill" data-level="${c.difficulty}">${c.difficulty}</span>
            </div>
          </div>
          <div class="class-card-body">
            <div class="class-card-meta-top">
              <span class="class-cuisine-tag">${c.cuisine}</span>
              <span>${c.duration}</span>
            </div>
            <h3 class="class-card-title"><a href="class-detail.html?id=${c.id}">${c.title}</a></h3>
            <p class="class-skill-summary">${c.skillSummary}</p>
            <div class="class-card-footer">
              <div class="class-price">
                <span class="price-amount">$${c.price}</span>
                <span class="price-unit">per guest</span>
              </div>
              <button class="btn btn-primary btn-sm btn-portal-book" data-class-id="${c.id}">
                Book Session
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    container.querySelectorAll('.btn-portal-book').forEach(btn => {
      btn.onclick = (e) => {
        const id = e.currentTarget.getAttribute('data-class-id');
        window.openBookingModal(id);
      };
    });
  }

  document.querySelectorAll('.portal-cuisine-pill').forEach(pill => {
    pill.onclick = () => {
      document.querySelectorAll('.portal-cuisine-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      portalCuisine = pill.getAttribute('data-cuisine');
      renderList();
    };
  });

  const diffSelect = document.getElementById('portalDifficultySelect');
  if (diffSelect) {
    diffSelect.onchange = (e) => {
      portalDifficulty = e.target.value;
      renderList();
    };
  }

  renderList();
}

function renderMyBookingsList(student) {
  const listContainer = document.getElementById('myBookingsList');
  if (!listContainer) return;

  if (!student.bookings || student.bookings.length === 0) {
    listContainer.innerHTML = `<p style="color:var(--body-muted);">No active bookings. Browse classes to book your first workstation.</p>`;
    return;
  }

  listContainer.innerHTML = student.bookings.map(b => `
    <div class="session-strip-card" style="margin-bottom:1rem;">
      <div class="session-date-box">
        <span class="session-date-day">${b.date.split('-')[2] || '26'}</span>
        <span class="session-date-month">SEP</span>
        <span class="session-date-time">${b.time}</span>
      </div>
      <div class="session-info-main">
        <span class="class-cuisine-tag">${b.cuisine} · Ref: ${b.id}</span>
        <h3 class="session-title">${b.classTitle}</h3>
        <span class="session-chef-meta">Led by ${b.chefName} · ${b.seats} Workstation(s)</span>
      </div>
      <div>
        <span class="seat-pill status-available">Confirmed ✓</span>
      </div>
      <div style="font-size:0.85rem; color:var(--body-muted);">
        ${b.studio}
      </div>
      <div style="text-align:right;">
        <a href="confirmation.html?ref=${b.id}" class="btn btn-outline btn-xs">Workstation Pass</a>
      </div>
    </div>
  `).join('');
}

function renderTastePassport(student) {
  const grid = document.getElementById('tastePassportGrid');
  if (!grid) return;

  const cuisines = ['Italian', 'Indian', 'Baking', 'Thai', 'Continental', 'Japanese', 'French', 'Mediterranean'];
  const passport = student.tastePassport;

  grid.innerHTML = cuisines.map(c => {
    const data = passport[c] || { completed: 0, lastDate: null };
    const isUnlocked = data.completed > 0;

    return `
      <div class="passport-stamp ${isUnlocked ? 'unlocked' : ''}">
        <div class="stamp-icon">${isUnlocked ? '✓' : '○'}</div>
        <div class="stamp-cuisine">${c}</div>
        <div class="stamp-status">${isUnlocked ? `${data.completed} Completed` : 'Not Explored'}</div>
      </div>
    `;
  }).join('');
}

function renderRecipeVault(student) {
  const grid = document.getElementById('recipeVaultGrid');
  if (!grid) return;

  grid.innerHTML = student.recipeVault.map(r => `
    <article class="recipe-vault-card">
      <div class="recipe-media">
        <img src="${r.img}" alt="${r.title}" class="recipe-img">
        <span class="badge badge-espresso" style="position:absolute; bottom:0.75rem; left:0.75rem;">${r.cuisine}</span>
      </div>
      <div class="recipe-body">
        <h4 class="recipe-title">${r.title}</h4>
        <p class="recipe-meta">From workshop with ${r.chef} · ${r.date}</p>
        <p class="recipe-note">
          "${r.chefNotes}"
        </p>
        <div class="recipe-actions">
          <button class="btn btn-outline btn-xs" onclick="openRecipeModal('${r.title}', '${r.chef}')">Open Recipe</button>
          <button class="btn btn-primary btn-xs" onclick="window.showToast('Downloading Recipe Card PDF...')">Download PDF</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderChefNotes(student) {
  const feed = document.getElementById('chefNotesFeed');
  if (!feed) return;

  feed.innerHTML = student.chefNotesList.map(n => `
    <div class="chef-note-card">
      <div style="font-family:var(--font-serif); font-size:2.2rem; color:var(--primary); line-height:1;">“</div>
      <div>
        <div class="note-category-badge">${n.category}</div>
        <h4 style="font-size:1.15rem; margin-bottom:0.25rem;">${n.dish}</h4>
        <p style="font-size:0.82rem; color:var(--body-muted); margin-bottom:0.75rem;">Shared by ${n.chef}</p>
        <p style="font-size:0.92rem; color:var(--text-body); line-height:1.6; margin:0;">${n.content}</p>
      </div>
    </div>
  `).join('');
}

function renderPastClasses(student) {
  const timeline = document.getElementById('pastClassesTimeline');
  if (!timeline) return;

  timeline.innerHTML = `
    <div class="timeline-year-marker">2026 Season</div>
    ${student.pastClasses.map(p => `
      <div class="timeline-step">
        <div class="timeline-time">${p.date} · ${p.cuisine}</div>
        <h4 class="timeline-title">${p.title}</h4>
        <p class="timeline-desc">Taught by ${p.chef} · Workshop Completed ✓</p>
        <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
          <button class="btn btn-outline btn-xs" onclick="window.showToast('Loading class notes & sensory materials...')">Revisit Class Notes</button>
        </div>
      </div>
    `).join('')}
  `;
}

// Interactive Recipe Modal
function openRecipeModal(title, chef) {
  alert(`Recipe Formula: ${title}\nChef Instructor: ${chef}\n\n1. Prep ingredients with 57% hydration balance.\n2. Work gluten web without tearing dough fibers.\n3. Emulsify with starchy cooking liquid.\n\nPDF card generated for download.`);
}
window.openRecipeModal = openRecipeModal;

/* ==========================================================================
   ACCOUNT PROFILE & STUDIO SETTINGS LOGIC
   ========================================================================== */
function initAccountAndSettings(student) {
  populateAccountAndSettings(student);

  // Profile form submission
  const profileForm = document.getElementById('accountProfileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('accInputName')?.value;
      const email = document.getElementById('accInputEmail')?.value;
      const phone = document.getElementById('accInputPhone')?.value;
      const level = document.getElementById('accSelectLevel')?.value;
      const dietary = document.getElementById('accInputDietary')?.value;
      const emergencyContact = document.getElementById('accInputEmergency')?.value;
      const bio = document.getElementById('accInputBio')?.value;

      const result = window.MiseState.updateStudentProfile({
        name,
        email,
        phone,
        level,
        dietary,
        emergencyContact,
        bio
      });

      if (result.success) {
        if (window.showToast) {
          window.showToast('Account profile successfully updated!');
        }
      }
    });
  }

  // Reset profile button
  const resetBtn = document.getElementById('btnResetProfile');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const current = window.MiseState.getStudent();
      populateAccountAndSettings(current);
      if (window.showToast) {
        window.showToast('Profile form reset to saved values.');
      }
    });
  }

  // Settings preferences form submission
  const settingsForm = document.getElementById('settingsPreferencesForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const units = document.querySelector('input[name="settingUnits"]:checked')?.value || 'metric';
      const preferredCuisine = document.getElementById('settingPreferredCuisine')?.value || 'Italian';
      const smsReminders = Boolean(document.getElementById('settingSmsReminders')?.checked);
      const emailReminders = Boolean(document.getElementById('settingEmailReminders')?.checked);
      const recipeDropAlerts = Boolean(document.getElementById('settingRecipeAlerts')?.checked);
      const calendarSync = Boolean(document.getElementById('settingCalendarSync')?.checked);

      window.MiseState.updateStudentSettings({
        units,
        preferredCuisine,
        smsReminders,
        emailReminders,
        recipeDropAlerts,
        calendarSync
      });

      if (window.showToast) {
        window.showToast('Studio preferences & alerts saved!');
      }
    });
  }

  // Security password form submission
  const securityForm = document.getElementById('settingsSecurityForm');
  if (securityForm) {
    securityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentPass = document.getElementById('secCurrentPass')?.value;
      const newPass = document.getElementById('secNewPass')?.value;
      const confirmPass = document.getElementById('secConfirmPass')?.value;

      if (!newPass || newPass.length < 8) {
        if (window.showToast) window.showToast('New password must be at least 8 characters long.');
        return;
      }
      if (newPass !== confirmPass) {
        if (window.showToast) window.showToast('Passwords do not match. Please verify and try again.');
        return;
      }

      securityForm.reset();
      if (window.showToast) {
        window.showToast('Password credentials updated successfully.');
      }
    });
  }
}

function populateAccountAndSettings(student) {
  if (!student) return;

  // Populate Profile Inputs
  const nameInput = document.getElementById('accInputName');
  if (nameInput) nameInput.value = student.name || '';

  const emailInput = document.getElementById('accInputEmail');
  if (emailInput) emailInput.value = student.email || '';

  const phoneInput = document.getElementById('accInputPhone');
  if (phoneInput) phoneInput.value = student.phone || '';

  const levelSelect = document.getElementById('accSelectLevel');
  if (levelSelect && student.level) levelSelect.value = student.level;

  const dietaryInput = document.getElementById('accInputDietary');
  if (dietaryInput) dietaryInput.value = student.dietary || '';

  const emergencyInput = document.getElementById('accInputEmergency');
  if (emergencyInput) emergencyInput.value = student.emergencyContact || '';

  const bioInput = document.getElementById('accInputBio');
  if (bioInput) bioInput.value = student.bio || '';

  // Stats Counters
  const workshopsCount = document.getElementById('statWorkshopsCount');
  if (workshopsCount) {
    const totalCompleted = Object.values(student.tastePassport || {}).reduce((acc, curr) => acc + (curr.completed || 0), 0);
    workshopsCount.innerText = totalCompleted || '6';
  }

  const activeBookings = document.getElementById('statActiveBookings');
  if (activeBookings) {
    activeBookings.innerText = student.bookings?.length || '0';
  }

  const cuisinesExplored = document.getElementById('statCuisinesExplored');
  if (cuisinesExplored) {
    const explored = Object.values(student.tastePassport || {}).filter(c => c.completed > 0).length;
    cuisinesExplored.innerText = explored || '3';
  }

  // Settings
  const settings = student.settings || window.MiseState.getStudentSettings();
  const unitRadio = document.querySelector(`input[name="settingUnits"][value="${settings.units}"]`);
  if (unitRadio) unitRadio.checked = true;

  const cuisineSelect = document.getElementById('settingPreferredCuisine');
  if (cuisineSelect && settings.preferredCuisine) cuisineSelect.value = settings.preferredCuisine;

  const smsCheck = document.getElementById('settingSmsReminders');
  if (smsCheck) smsCheck.checked = Boolean(settings.smsReminders !== false);

  const emailCheck = document.getElementById('settingEmailReminders');
  if (emailCheck) emailCheck.checked = Boolean(settings.emailReminders !== false);

  const alertsCheck = document.getElementById('settingRecipeAlerts');
  if (alertsCheck) alertsCheck.checked = Boolean(settings.recipeDropAlerts !== false);

  const calCheck = document.getElementById('settingCalendarSync');
  if (calCheck) calCheck.checked = Boolean(settings.calendarSync !== false);
}
