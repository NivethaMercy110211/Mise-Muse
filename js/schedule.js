/* ==========================================================================
   MISE & MUSE - SCHEDULE & CALENDAR CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSchedulePage();
});

function initSchedulePage() {
  const listContainer = document.getElementById('scheduleSessionsList');
  const calendarContainer = document.getElementById('scheduleCalendarContainer');
  const btnViewList = document.getElementById('btnViewList');
  const btnViewCalendar = document.getElementById('btnViewCalendar');

  if (!listContainer || !window.MiseState) return;

  // View Switcher
  if (btnViewList && btnViewCalendar) {
    btnViewList.addEventListener('click', () => {
      btnViewList.classList.add('active');
      btnViewCalendar.classList.remove('active');
      listContainer.style.display = 'flex';
      calendarContainer.style.display = 'none';
    });

    btnViewCalendar.addEventListener('click', () => {
      btnViewCalendar.classList.add('active');
      btnViewList.classList.remove('active');
      listContainer.style.display = 'none';
      calendarContainer.style.display = 'block';
    });
  }

  function renderSessions() {
    const classes = window.MiseState.getClasses();
    
    // Render List View
    listContainer.innerHTML = classes.map(c => {
      const avail = c.capacity - c.bookedSeats;
      const pct = Math.round((c.bookedSeats / c.capacity) * 100);
      const dateObj = new Date(c.upcomingDate);
      const dayNum = dateObj.getDate();
      const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' });

      let seatBadge = `<span class="seat-pill status-available">${avail} Available</span>`;
      if (avail <= 3 && avail > 0) {
        seatBadge = `<span class="seat-pill status-few">${avail} Left</span>`;
      } else if (avail === 0) {
        seatBadge = `<span class="seat-pill status-full">Full</span>`;
      }

      return `
        <div class="session-strip-card">
          <div class="session-date-box">
            <span class="session-date-day">${dayNum}</span>
            <span class="session-date-month">${monthStr}</span>
            <span class="session-date-time">${c.time}</span>
          </div>

          <div class="session-info-main">
            <span class="class-cuisine-tag" style="font-size:0.75rem;">${c.cuisine} · ${c.duration}</span>
            <h3 class="session-title"><a href="class-detail.html?id=${c.id}">${c.title}</a></h3>
            <span class="session-chef-meta">Led by ${c.chefName}</span>
          </div>

          <div>
            <span class="difficulty-pill" data-level="${c.difficulty}">
              <span class="difficulty-bars">
                <span class="difficulty-bar"></span>
                <span class="difficulty-bar"></span>
                <span class="difficulty-bar"></span>
              </span>
              ${c.difficulty}
            </span>
          </div>

          <div class="capacity-indicator">
            <div class="capacity-stats">
              <span><strong>${c.bookedSeats}</strong>/${c.capacity} Booked</span>
              ${seatBadge}
            </div>
            <div class="capacity-bar-track">
              <div class="capacity-bar-fill" style="width: ${pct}%;"></div>
            </div>
          </div>

          <div style="text-align:right;">
            <div style="font-family:var(--font-serif); font-size:1.4rem; color:var(--text-main); margin-bottom:0.4rem;">$${c.price}</div>
            <button class="btn btn-primary btn-sm btn-schedule-book" data-class-id="${c.id}">Book Class</button>
          </div>
        </div>
      `;
    }).join('');

    // Bind Book buttons
    listContainer.querySelectorAll('.btn-schedule-book').forEach(b => {
      b.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-class-id');
        window.openBookingModal(id);
      });
    });

    // Render Calendar View Chips
    const calGrid = document.getElementById('calendarDaysGrid');
    if (calGrid) {
      calGrid.querySelectorAll('.cal-day-cell').forEach(cell => {
        const date = cell.getAttribute('data-date');
        const matched = date ? classes.filter(c => c.upcomingDate === date) : [];
        cell.classList.toggle('has-session', matched.length > 0);

        let chipsWrap = cell.querySelector('.cal-chips-container');
        if (matched.length && !chipsWrap) {
          chipsWrap = document.createElement('div');
          chipsWrap.className = 'cal-chips-container';
          cell.appendChild(chipsWrap);
        }

        if (chipsWrap) {
          chipsWrap.innerHTML = matched.map(m => {
            const avail = m.capacity - m.bookedSeats;
            return `
              <button class="cal-session-chip" type="button" data-class-id="${m.id}" title="${m.title}">
                <span class="cal-chip-time">${m.time.split(' - ')[0]}</span>
                <span class="cal-chip-title">${m.title}</span>
                <span class="cal-chip-seats">${avail} ${avail === 1 ? 'seat' : 'seats'} left</span>
              </button>
            `;
          }).join('');
        }
      });

      calGrid.querySelectorAll('.cal-session-chip').forEach(chip => {
        chip.addEventListener('click', () => window.openBookingModal(chip.dataset.classId));
      });
    }

    const mobileAgenda = document.getElementById('calendarMobileAgenda');
    if (mobileAgenda) {
      mobileAgenda.innerHTML = [...classes]
        .sort((a, b) => new Date(a.upcomingDate) - new Date(b.upcomingDate))
        .map(c => {
          const date = new Date(`${c.upcomingDate}T12:00:00`);
          const available = c.capacity - c.bookedSeats;
          const statusClass = available === 0 ? 'status-full' : available <= 3 ? 'status-few' : 'status-available';
          const statusText = available === 0 ? 'Waitlist' : `${available} ${available === 1 ? 'seat' : 'seats'}`;

          return `
            <button class="cal-agenda-card" type="button" data-class-id="${c.id}" aria-label="Book ${c.title}">
              <span class="cal-agenda-date">
                <span class="cal-agenda-day">${date.getDate()}</span>
                <span class="cal-agenda-month">${date.toLocaleDateString('en-US', { month: 'short' })}</span>
              </span>
              <span class="cal-agenda-info">
                <span class="cal-agenda-meta">${c.time} · ${c.cuisine}</span>
                <strong>${c.title}</strong>
                <span>with ${c.chefName}</span>
              </span>
              <span class="seat-pill ${statusClass}">${statusText}</span>
              <svg class="cal-agenda-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
          `;
        }).join('');

      mobileAgenda.querySelectorAll('.cal-agenda-card').forEach(card => {
        card.addEventListener('click', () => window.openBookingModal(card.dataset.classId));
      });
    }
  }

  window.addEventListener('miseStateChanged', renderSessions);
  renderSessions();
}
