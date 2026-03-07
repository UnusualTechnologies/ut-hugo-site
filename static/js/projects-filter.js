// Project tag filtering
document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('input[name="project-tag[]"]');
  const cards = document.querySelectorAll('.project-card-container');
  const heading = document.getElementById('matching-heading');

  checkboxes.forEach((cb) => {
    cb.addEventListener('change', filterProjects);
  });

  function filterProjects() {
    const selected = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) selected.push(cb.value);
    });

    if (selected.length === 0) {
      // Show all, reset order
      cards.forEach((card) => {
        card.style.display = '';
        card.style.order = '';
      });
      heading.classList.add('hidden');
      return;
    }

    heading.classList.remove('hidden');

    // Score and sort
    const scored = [];
    cards.forEach((card) => {
      const tags = card.dataset.tags.split(',');
      const prominence = parseInt(card.dataset.prominence) || 0;
      let matchCount = 0;
      selected.forEach((sel) => {
        if (tags.includes(sel)) matchCount++;
      });

      if (matchCount > 0) {
        card.style.display = '';
        scored.push({ el: card, score: matchCount * prominence });
      } else {
        card.style.display = 'none';
      }
    });

    // Sort by score descending using CSS order
    scored.sort((a, b) => b.score - a.score);
    scored.forEach((item, i) => {
      item.el.style.order = i;
    });
  }

  // Filter toggle for mobile
  const toggle = document.querySelector('.filter-toggle');
  const tagList = document.getElementById('toggleList');
  if (toggle && tagList) {
    toggle.addEventListener('click', () => {
      tagList.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }
});
