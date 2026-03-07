// Project tag filtering
document.addEventListener('DOMContentLoaded', function () {
  var checkboxes = document.querySelectorAll('input[name="project-tag[]"]');
  var cards = document.querySelectorAll('.project-card-container');
  var heading = document.getElementById('matching-heading');
  var grid = document.getElementById('project-grid');

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', filterProjects);
  });

  function filterProjects() {
    var selected = [];
    checkboxes.forEach(function (cb) {
      if (cb.checked) selected.push(cb.value);
    });

    if (selected.length === 0) {
      // Show all, reset order
      cards.forEach(function (card) {
        card.style.display = '';
        card.style.order = '';
      });
      heading.style.display = 'none';
      return;
    }

    heading.style.display = '';

    // Score and sort
    var scored = [];
    cards.forEach(function (card) {
      var tags = card.dataset.tags.split(',');
      var prominence = parseInt(card.dataset.prominence) || 0;
      var matchCount = 0;
      selected.forEach(function (sel) {
        if (tags.indexOf(sel) !== -1) matchCount++;
      });

      if (matchCount > 0) {
        card.style.display = '';
        scored.push({ el: card, score: matchCount * prominence });
      } else {
        card.style.display = 'none';
      }
    });

    // Sort by score descending using CSS order
    scored.sort(function (a, b) { return b.score - a.score; });
    scored.forEach(function (item, i) {
      item.el.style.order = i;
    });
  }

  // Filter toggle for mobile
  var toggle = document.querySelector('.filter-toggle');
  var tagList = document.getElementById('toggleList');
  if (toggle && tagList) {
    toggle.addEventListener('click', function () {
      tagList.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }
});
