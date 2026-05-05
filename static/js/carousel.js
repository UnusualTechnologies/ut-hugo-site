document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');

    // Unwrap figures from paragraph wrappers that Hugo's markdown creates
    track.querySelectorAll('p').forEach(function (p) {
      while (p.firstChild) {
        p.parentNode.insertBefore(p.firstChild, p);
      }
      p.parentNode.removeChild(p);
    });

    var items = Array.from(track.querySelectorAll('.project-figure'));
    if (items.length === 0) return;

    var visible = 3;
    var index = 0;
    var maxIndex = Math.max(0, items.length - visible);

    if (items.length <= visible) {
      carousel.querySelector('.carousel-prev').style.display = 'none';
      carousel.querySelector('.carousel-next').style.display = 'none';
    }

    function update() {
      var gap = 8;
      var trackWidth = carousel.offsetWidth - 80; // account for chevron overlap
      var itemWidth = (trackWidth - gap * (visible - 1)) / visible;
      items.forEach(function (item) {
        item.style.flex = '0 0 ' + itemWidth + 'px';
        item.style.maxWidth = itemWidth + 'px';
      });
      var offset = index * (itemWidth + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';
    }

    carousel.querySelector('.carousel-prev').addEventListener('click', function () {
      index = index > 0 ? index - 1 : maxIndex;
      update();
    });

    carousel.querySelector('.carousel-next').addEventListener('click', function () {
      index = index < maxIndex ? index + 1 : 0;
      update();
    });

    update();
    window.addEventListener('resize', update);
  });
});
