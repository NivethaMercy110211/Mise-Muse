/* ==========================================================================
   MISE & MUSE - CLASSES FILTERING & DISCOVERY ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initClassesPage();
});

function balanceCardText(text, lineCount) {
  const words = text.trim().split(/\s+/);
  if (words.length <= lineCount) {
    return Array.from({ length: lineCount }, (_, index) => words[index] || '');
  }

  const prefixLengths = [0];
  words.forEach(word => prefixLengths.push(prefixLengths[prefixLengths.length - 1] + word.length));
  const lineLength = (start, end) => prefixLengths[end] - prefixLengths[start] + Math.max(0, end - start - 1);
  const averageLength = lineLength(0, words.length) / lineCount;
  let bestLines = [];
  let bestScore = Infinity;

  const findBreaks = (start, linesLeft, currentLines) => {
    if (linesLeft === 1) {
      const finalLines = [...currentLines, words.slice(start).join(' ')];
      const score = finalLines.reduce((total, line) => total + (line.length - averageLength) ** 2, 0);
      if (score < bestScore) {
        bestScore = score;
        bestLines = finalLines;
      }
      return;
    }

    const lastBreak = words.length - linesLeft + 1;
    for (let next = start + 1; next < lastBreak; next += 1) {
      findBreaks(next, linesLeft - 1, [...currentLines, words.slice(start, next).join(' ')]);
    }
  };

  findBreaks(0, lineCount, []);
  return bestLines;
}

function initClassesPage() {
  const container = document.getElementById('classesGridContainer');
  if (!container || !window.MiseState) return;

  let activeCuisine = 'All';
  let activeDifficulty = 'All';
  let searchQuery = '';
  let vegOnly = false;

  function render() {
    const classes = window.MiseState.getClasses();
    const filtered = classes.filter(c => {
      const matchCuisine = activeCuisine === 'All' || c.cuisine.toLowerCase() === activeCuisine.toLowerCase();
      const matchDiff = activeDifficulty === 'All' || c.difficulty.toUpperCase() === activeDifficulty.toUpperCase();
      const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.skillSummary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchVeg = !vegOnly || c.vegetarianFriendly;
      return matchCuisine && matchDiff && matchSearch && matchVeg;
    });

    const countEl = document.getElementById('resultsCount');
    if (countEl) countEl.innerText = `Showing ${filtered.length} culinary experiences`;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="classes-empty-state">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h3 style="font-family:var(--font-serif); margin-bottom:0.5rem;">No classes match these filters</h3>
          <p style="color:var(--body-muted); margin-bottom:1.5rem;">Try selecting another cuisine, difficulty or clear the search term.</p>
          <button class="btn btn-primary" id="btnResetFilters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btnResetFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCuisine = 'All';
          activeDifficulty = 'All';
          searchQuery = '';
          vegOnly = false;
          document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          const defCuisine = document.querySelector('.filter-pill[data-cuisine="All"]');
          if (defCuisine) defCuisine.classList.add('active');
          const searchInput = document.getElementById('classSearchInput');
          if (searchInput) searchInput.value = '';
          render();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(c => {
      const available = c.capacity - c.bookedSeats;
      let seatClass = 'status-available';
      let seatText = `${available} seats left`;
      if (available <= 3) {
        seatClass = 'status-few';
      }
      if (available === 0) {
        seatClass = 'status-full';
        seatText = 'FULL / WAITLIST';
      }

      return `
        <article class="class-card">
          <div class="class-card-media">
            <img src="${c.image}" alt="${c.title}" class="class-card-img" loading="lazy">
            <div class="class-card-badges">
              <span class="seat-pill ${seatClass}">${seatText}</span>
              <span class="difficulty-pill" data-level="${c.difficulty}">
                <span class="difficulty-bars">
                  <span class="difficulty-bar"></span>
                  <span class="difficulty-bar"></span>
                  <span class="difficulty-bar"></span>
                </span>
                ${c.difficulty}
              </span>
            </div>
          </div>
          <div class="class-card-body">
            <div class="class-card-meta-top">
              <span class="class-cuisine-tag">${c.cuisine}</span>
              <span>${c.duration}</span>
            </div>
            <h3 class="class-card-title">
              <a href="class-detail.html?id=${c.id}">${balanceCardText(c.title, 2).map(line => `<span>${line}</span>`).join('')}</a>
            </h3>
            <p class="class-skill-summary">${balanceCardText(c.skillSummary, 3).map(line => `<span>${line}</span>`).join('')}</p>
            
            <div class="class-details-mini">
              <div class="mini-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>${c.chefName}</span>
              </div>
              <div class="mini-detail-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>${c.upcomingDate}</span>
              </div>
            </div>

            <div class="class-card-footer">
              <div class="class-price">
                <span class="price-amount">$${c.price}</span>
                <span class="price-unit">per person</span>
              </div>
              <div style="display:flex; gap:0.5rem;">
                <a href="class-detail.html?id=${c.id}" class="btn btn-outline btn-sm">View Experience</a>
                <button class="btn btn-primary btn-sm btn-quick-book" data-class-id="${c.id}">Book</button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind Quick Book Buttons
    container.querySelectorAll('.btn-quick-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-class-id');
        window.openBookingModal(id);
      });
    });
  }

  // Bind Cuisine Filter Pills
  document.querySelectorAll('.filter-pill[data-cuisine]').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill[data-cuisine]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCuisine = pill.getAttribute('data-cuisine');
      render();
    });
  });

  // Bind Difficulty Filter Select
  const diffSelect = document.getElementById('difficultySelect');
  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      activeDifficulty = e.target.value;
      render();
    });
  }

  // Bind Search Input
  const searchInput = document.getElementById('classSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  // Re-render when state changes (e.g. booked seats change)
  window.addEventListener('miseStateChanged', render);

  render();
}
