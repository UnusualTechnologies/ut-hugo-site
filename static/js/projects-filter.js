// Project dropdown filter
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card-container');
  const totalCount = cards.length;
  const dropdowns = document.querySelectorAll('.filter-dropdown');
  const checkboxes = document.querySelectorAll('input[name="project-tag[]"]');
  const clearBtn = document.getElementById('filter-clear');
  const activeTags = document.getElementById('filter-active-tags');
  const results = document.getElementById('filter-results');

  // --- Dropdown toggle ---
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.filter-dropdown-btn');
    const menu = dropdown.querySelector('.filter-dropdown-menu');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');

      // Close all dropdowns first
      closeAllDropdowns();

      if (!isOpen) {
        menu.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', closeAllDropdowns);

  // Prevent menu clicks from closing the dropdown
  document.querySelectorAll('.filter-dropdown-menu').forEach(menu => {
    menu.addEventListener('click', (e) => e.stopPropagation());
  });

  function closeAllDropdowns() {
    dropdowns.forEach(d => {
      d.querySelector('.filter-dropdown-menu').classList.remove('open');
      d.querySelector('.filter-dropdown-btn').setAttribute('aria-expanded', 'false');
    });
  }

  // --- Checkbox change → filter ---
  checkboxes.forEach(cb => {
    cb.addEventListener('change', filterProjects);
  });

  // --- Clear all ---
  clearBtn.addEventListener('click', () => {
    checkboxes.forEach(cb => { cb.checked = false; });
    filterProjects();
  });

  // --- Main filter logic ---
  function filterProjects() {
    const selected = [];
    checkboxes.forEach(cb => {
      if (cb.checked) selected.push(cb.value);
    });

    // Update per-dropdown count badges
    dropdowns.forEach(dropdown => {
      const count = dropdown.querySelectorAll('input:checked').length;
      const countEl = dropdown.querySelector('.filter-dropdown-count');
      const btn = dropdown.querySelector('.filter-dropdown-btn');
      if (count > 0) {
        countEl.textContent = count;
        countEl.classList.add('active');
        btn.classList.add('has-active');
      } else {
        countEl.textContent = '';
        countEl.classList.remove('active');
        btn.classList.remove('has-active');
      }
    });

    // Show/hide clear button
    clearBtn.classList.toggle('hidden', selected.length === 0);

    // Render active filter pills
    renderActiveTags(selected);

    // No filters → show all, reset order
    if (selected.length === 0) {
      cards.forEach(card => {
        card.style.display = '';
        card.style.order = '';
      });
      results.textContent = '';
      return;
    }

    // Score each card: match count * 1000 + prominence (so matches dominate)
    let visibleCount = 0;
    const scored = [];

    cards.forEach(card => {
      const tags = card.dataset.tags.split(',');
      const prominence = parseInt(card.dataset.prominence) || 0;
      let matchCount = 0;
      selected.forEach(sel => {
        if (tags.includes(sel)) matchCount++;
      });

      if (matchCount > 0) {
        card.style.display = '';
        scored.push({ el: card, score: matchCount * 1000 + prominence });
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    scored.sort((a, b) => b.score - a.score);
    scored.forEach((item, i) => {
      item.el.style.order = i;
    });

    results.textContent = visibleCount + ' of ' + totalCount + ' projects';
  }

  // --- Active filter pills ---
  function renderActiveTags(selected) {
    activeTags.innerHTML = '';
    selected.forEach(tag => {
      const checkbox = document.querySelector('input[name="project-tag[]"][value="' + tag + '"]');
      if (!checkbox) return;
      const label = checkbox.closest('.filter-option').textContent.trim();

      const chip = document.createElement('button');
      chip.className = 'filter-active-tag';
      chip.type = 'button';
      chip.innerHTML = label + ' <svg viewBox="0 0 10 10" fill="none"><path d="M2 2L8 8M8 2L2 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
      chip.addEventListener('click', () => {
        checkbox.checked = false;
        filterProjects();
      });
      activeTags.appendChild(chip);
    });
  }

  // --- Keyboard: Escape closes dropdowns ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });
});
