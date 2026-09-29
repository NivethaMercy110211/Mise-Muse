/* ==========================================================================
   MISE & MUSE - 6-STEP BOOKING FLOW MODAL & SEAT CONTROLLER
   ========================================================================== */

class BookingModalManager {
  constructor() {
    this.currentStep = 1;
    this.selectedClassId = null;
    this.selectedDate = null;
    this.selectedTime = null;
    this.seatCount = 1;
    this.dietaryNotes = '';
    this.winePairing = false;

    this.initElements();
    this.bindEvents();
  }

  initElements() {
    // Create Modal HTML markup dynamically if not already on page
    if (!document.getElementById('globalBookingModal')) {
      const modalEl = document.createElement('div');
      modalEl.id = 'globalBookingModal';
      modalEl.className = 'booking-modal-overlay';
      modalEl.innerHTML = `
        <div class="booking-modal-container">
          <div class="booking-modal-header">
            <div>
              <span class="section-eyebrow" style="margin-bottom:0.25rem;">Live Booking</span>
              <h4 id="modalFlowTitle" style="font-size:1.15rem; margin:0;">Select Cooking Workshop</h4>
            </div>
            <div class="modal-step-dots">
              <span class="step-dot active" data-step="1"></span>
              <span class="step-dot" data-step="2"></span>
              <span class="step-dot" data-step="3"></span>
              <span class="step-dot" data-step="4"></span>
              <span class="step-dot" data-step="5"></span>
              <span class="step-dot" data-step="6"></span>
            </div>
            <button class="modal-close-btn" id="closeBookingModalBtn" aria-label="Close modal">&times;</button>
          </div>

          <div class="booking-modal-body">
            <!-- STEP 1: CHOOSE CLASS -->
            <div class="booking-step-content active" id="bStep1">
              <h3 class="step-heading">Choose Your Experience</h3>
              <p class="step-desc">Select from our chef-led culinary workshops.</p>
              <div class="option-select-grid" id="modalClassGrid"></div>
            </div>

            <!-- STEP 2: CHOOSE DATE -->
            <div class="booking-step-content" id="bStep2">
              <h3 class="step-heading">Select Session Date</h3>
              <p class="step-desc">Pick an available workshop date for <span id="step2ClassName" style="color:var(--primary); font-weight:700;"></span>.</p>
              <div class="option-select-grid" id="modalDateGrid"></div>
            </div>

            <!-- STEP 3: CHOOSE TIME -->
            <div class="booking-step-content" id="bStep3">
              <h3 class="step-heading">Select Session Time</h3>
              <p class="step-desc">Choose your preferred kitchen atelier slot.</p>
              <div class="option-select-grid" id="modalTimeGrid"></div>
            </div>

            <!-- STEP 4: SEATS & ADDONS -->
            <div class="booking-step-content" id="bStep4">
              <h3 class="step-heading">Select Seats & Additions</h3>
              <p class="step-desc">Individual workstations prepared for each guest.</p>
              
              <div class="seat-counter-wrap">
                <div>
                  <h4 style="font-size:1.1rem; margin-bottom:0.2rem;">Guest Workstations</h4>
                  <p style="font-size:0.85rem; color:var(--body-muted); margin:0;" id="modalSeatRemainingText">Seats available</p>
                </div>
                <div class="counter-controls">
                  <button class="counter-btn" id="btnDecSeats" type="button">-</button>
                  <span class="counter-value" id="modalSeatVal">1</span>
                  <button class="counter-btn" id="btnIncSeats" type="button">+</button>
                </div>
              </div>

              <div class="form-group" style="margin-top:1.5rem;">
                <label class="form-label">Dietary & Allergy Requirements</label>
                <input type="text" class="form-control" id="modalDietary" placeholder="e.g. Nut allergy, pescatarian, gluten-free preference...">
              </div>
            </div>

            <!-- STEP 5: REVIEW & SUMMARY -->
            <div class="booking-step-content" id="bStep5">
              <h3 class="step-heading">Review Your Workshop Booking</h3>
              <p class="step-desc">Verify your session details prior to confirmation.</p>
              
              <div class="booking-summary-box">
                <div class="summary-line">
                  <span style="color:var(--body-muted);">Workshop:</span>
                  <strong id="sumClassTitle" style="color:var(--text-main);"></strong>
                </div>
                <div class="summary-line">
                  <span style="color:var(--body-muted);">Date & Time:</span>
                  <span id="sumDateTime"></span>
                </div>
                <div class="summary-line">
                  <span style="color:var(--body-muted);">Chef Instructor:</span>
                  <span id="sumChef"></span>
                </div>
                <div class="summary-line">
                  <span style="color:var(--body-muted);">Seats / Workstations:</span>
                  <span id="sumSeats"></span>
                </div>
                <div class="summary-line summary-total">
                  <span>Total Experience Fee:</span>
                  <span id="sumTotal" style="color:var(--primary);">$0.00</span>
                </div>
              </div>
            </div>

            <!-- STEP 6: CONFIRMATION -->
            <div class="booking-step-content" id="bStep6">
              <div style="text-align:center; padding:1.5rem 0;">
                <div class="confirmation-badge-top">✓</div>
                <h2 style="font-size:2rem; margin-bottom:0.5rem;">You're Cooking With Us!</h2>
                <p class="lead" style="margin-bottom:1.5rem;">Your workstation has been reserved at Mise & Muse Culinary Studio.</p>
                
                <div class="ticket-details-box" style="text-align:left;">
                  <div>
                    <div class="ticket-item-label">Booking Reference</div>
                    <div class="ticket-item-val" id="confBookingRef">BK-2026-889</div>
                  </div>
                  <div>
                    <div class="ticket-item-label">Class</div>
                    <div class="ticket-item-val" id="confClass"></div>
                  </div>
                  <div>
                    <div class="ticket-item-label">Date & Time</div>
                    <div class="ticket-item-val" id="confDate"></div>
                  </div>
                  <div>
                    <div class="ticket-item-label">Location / Studio</div>
                    <div class="ticket-item-val">Studio 1 · Central Atelier</div>
                  </div>
                </div>

                <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
                  <button class="btn btn-primary" id="btnDownloadCalendar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    Add to Calendar (.ics)
                  </button>
                  <a href="dashboard.html" class="btn btn-espresso">View in My Kitchen</a>
                </div>
              </div>
            </div>
          </div>

          <div class="booking-modal-footer" id="modalFooterNav">
            <button class="btn btn-outline" id="btnPrevStep" style="visibility:hidden;">Back</button>
            <button class="btn btn-primary" id="btnNextStep">Continue →</button>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);
    }
  }

  bindEvents() {
    const modal = document.getElementById('globalBookingModal');
    const closeBtn = document.getElementById('closeBookingModalBtn');
    const prevBtn = document.getElementById('btnPrevStep');
    const nextBtn = document.getElementById('btnNextStep');
    const decSeatsBtn = document.getElementById('btnDecSeats');
    const incSeatsBtn = document.getElementById('btnIncSeats');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevStep());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());

    if (decSeatsBtn) {
      decSeatsBtn.addEventListener('click', () => {
        if (this.seatCount > 1) {
          this.seatCount--;
          document.getElementById('modalSeatVal').innerText = this.seatCount;
        }
      });
    }

    if (incSeatsBtn) {
      incSeatsBtn.addEventListener('click', () => {
        const cls = window.MiseState.getClassById(this.selectedClassId);
        const maxAvail = cls ? (cls.capacity - cls.bookedSeats) : 4;
        if (this.seatCount < maxAvail) {
          this.seatCount++;
          document.getElementById('modalSeatVal').innerText = this.seatCount;
        } else {
          window.showToast(`Maximum ${maxAvail} seats available for this session.`);
        }
      });
    }

    // Calendar download handler
    const calBtn = document.getElementById('btnDownloadCalendar');
    if (calBtn) {
      calBtn.addEventListener('click', () => {
        const cls = window.MiseState.getClassById(this.selectedClassId);
        if (!cls) return;
        const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mise & Muse Culinary Studio//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:${cls.title} - Mise & Muse
DESCRIPTION:Hands-on culinary session with ${cls.chefName}.
LOCATION:Studio 1, Mise & Muse Culinary Studio
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `Mise_Muse_${cls.slug}.ics`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.showToast('Calendar event file (.ics) downloaded.');
      });
    }
  }

  open(classId = null) {
    const modal = document.getElementById('globalBookingModal');
    if (!modal) return;
    this.currentStep = 1;
    this.selectedClassId = classId || window.MiseState.getClasses()[0].id;
    this.seatCount = 1;
    document.getElementById('modalSeatVal').innerText = '1';

    this.renderStep1();
    this.updateStepUI();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    const modal = document.getElementById('globalBookingModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  updateStepUI() {
    // Update step visibility
    for (let i = 1; i <= 6; i++) {
      const stepEl = document.getElementById(`bStep${i}`);
      const dotEl = document.querySelector(`.step-dot[data-step="${i}"]`);
      if (stepEl) {
        stepEl.classList.toggle('active', i === this.currentStep);
      }
      if (dotEl) {
        dotEl.classList.toggle('active', i === this.currentStep);
        dotEl.classList.toggle('completed', i < this.currentStep);
      }
    }

    const prevBtn = document.getElementById('btnPrevStep');
    const nextBtn = document.getElementById('btnNextStep');
    const footerNav = document.getElementById('modalFooterNav');

    if (this.currentStep === 1) {
      prevBtn.style.visibility = 'hidden';
      nextBtn.innerText = 'Choose Date →';
    } else if (this.currentStep === 5) {
      prevBtn.style.visibility = 'visible';
      nextBtn.innerText = 'Confirm & Book Now';
    } else if (this.currentStep === 6) {
      footerNav.style.display = 'none'; // Hide footer buttons on final confirmation
    } else {
      prevBtn.style.visibility = 'visible';
      footerNav.style.display = 'flex';
      nextBtn.innerText = 'Continue →';
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.renderStep2();
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      this.renderStep3();
      this.currentStep = 3;
    } else if (this.currentStep === 3) {
      this.renderStep4();
      this.currentStep = 4;
    } else if (this.currentStep === 4) {
      this.renderStep5();
      this.currentStep = 5;
    } else if (this.currentStep === 5) {
      // Execute Booking in State
      const result = window.MiseState.bookClass(this.selectedClassId, this.seatCount);
      if (result.success) {
        this.renderStep6(result.booking);
        this.currentStep = 6;
      } else {
        window.showToast(result.message || 'Booking could not be processed.');
        return;
      }
    }
    this.updateStepUI();
  }

  prevStep() {
    if (this.currentStep > 1 && this.currentStep < 6) {
      this.currentStep--;
      this.updateStepUI();
    }
  }

  renderStep1() {
    const grid = document.getElementById('modalClassGrid');
    if (!grid) return;
    const classes = window.MiseState.getClasses();

    grid.innerHTML = classes.map(c => {
      const isSelected = c.id === this.selectedClassId;
      const seatsLeft = c.capacity - c.bookedSeats;
      return `
        <div class="option-select-card ${isSelected ? 'selected' : ''}" data-class-id="${c.id}">
          <strong style="display:block; font-size:0.95rem; margin-bottom:0.25rem;">${c.title}</strong>
          <span style="font-size:0.8rem; color:var(--primary); font-weight:700;">$${c.price} / person</span>
          <div style="margin-top:0.5rem;">
            <span class="seat-pill ${seatsLeft <= 3 ? 'status-few' : 'status-available'}">${seatsLeft} seats left</span>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.option-select-card').forEach(card => {
      card.addEventListener('click', () => {
        grid.querySelectorAll('.option-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedClassId = card.getAttribute('data-class-id');
      });
    });
  }

  renderStep2() {
    const cls = window.MiseState.getClassById(this.selectedClassId);
    document.getElementById('step2ClassName').innerText = cls ? cls.title : '';
    const dateGrid = document.getElementById('modalDateGrid');
    
    // Provide realistic date options
    const dates = [
      { label: 'This Saturday', date: '2026-09-26' },
      { label: 'Next Wednesday', date: '2026-09-30' },
      { label: 'Next Saturday', date: '2026-10-03' }
    ];
    this.selectedDate = dates[0].date;

    dateGrid.innerHTML = dates.map((d, idx) => `
      <div class="option-select-card ${idx === 0 ? 'selected' : ''}" data-date="${d.date}">
        <div style="font-weight:700; font-size:1.1rem; color:var(--primary);">${d.date}</div>
        <div style="font-size:0.85rem; color:var(--body-muted);">${d.label}</div>
      </div>
    `).join('');

    dateGrid.querySelectorAll('.option-select-card').forEach(card => {
      card.addEventListener('click', () => {
        dateGrid.querySelectorAll('.option-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedDate = card.getAttribute('data-date');
      });
    });
  }

  renderStep3() {
    const timeGrid = document.getElementById('modalTimeGrid');
    const times = [
      { slot: 'Morning Atelier', time: '10:00 - 13:30' },
      { slot: 'Evening Workshop', time: '18:00 - 21:30' }
    ];
    this.selectedTime = times[1].time;

    timeGrid.innerHTML = times.map((t, idx) => `
      <div class="option-select-card ${idx === 1 ? 'selected' : ''}" data-time="${t.time}">
        <div style="font-weight:700; font-size:1.05rem;">${t.time}</div>
        <div style="font-size:0.82rem; color:var(--body-muted);">${t.slot}</div>
      </div>
    `).join('');

    timeGrid.querySelectorAll('.option-select-card').forEach(card => {
      card.addEventListener('click', () => {
        timeGrid.querySelectorAll('.option-select-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedTime = card.getAttribute('data-time');
      });
    });
  }

  renderStep4() {
    const cls = window.MiseState.getClassById(this.selectedClassId);
    if (cls) {
      const avail = cls.capacity - cls.bookedSeats;
      document.getElementById('modalSeatRemainingText').innerText = `${avail} of ${cls.capacity} seats remaining`;
    }
  }

  renderStep5() {
    const cls = window.MiseState.getClassById(this.selectedClassId);
    if (!cls) return;

    document.getElementById('sumClassTitle').innerText = cls.title;
    document.getElementById('sumDateTime').innerText = `${this.selectedDate} · ${this.selectedTime}`;
    document.getElementById('sumChef').innerText = cls.chefName;
    document.getElementById('sumSeats').innerText = `${this.seatCount} Guest(s)`;
    const total = cls.price * this.seatCount;
    document.getElementById('sumTotal').innerText = `$${total.toFixed(2)}`;
  }

  renderStep6(booking) {
    document.getElementById('confBookingRef').innerText = booking.id;
    document.getElementById('confClass').innerText = booking.classTitle;
    document.getElementById('confDate').innerText = `${booking.date} (${booking.time})`;
    window.showToast('Cooking workshop successfully confirmed!');
  }
}

window.BookingModal = new BookingModalManager();
window.openBookingModal = (classId) => window.BookingModal.open(classId);
