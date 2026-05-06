// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('open');
  });
});

// Lazy-load videos: only load when scrolled into view
document.addEventListener('DOMContentLoaded', function () {
  var basePath = document.body.getAttribute('data-base-path') || '';
  var videos = document.querySelectorAll('video source[data-src]');
  if (!videos.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var source = entry.target.querySelector('source[data-src]');
      if (!source) return;
      var src = source.getAttribute('data-src');
      // Prepend base path for absolute paths
      if (src.charAt(0) === '/') {
        src = basePath + src.substring(1);
      }
      source.setAttribute('src', src);
      source.removeAttribute('data-src');
      entry.target.load();
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '200px' });

  videos.forEach(function (source) {
    observer.observe(source.closest('video'));
  });
});

// Testimonial click-to-play
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.testimonial-card[data-video-id]').forEach(function (card) {
    card.addEventListener('click', function () {
      var id = card.getAttribute('data-video-id');
      var thumb = card.querySelector('.testimonial-card-thumb');
      if (!thumb || card.classList.contains('is-playing')) return;
      var embed = document.createElement('div');
      embed.className = 'video-embed';
      embed.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      thumb.replaceWith(embed);
      card.classList.add('is-playing');
    });
  });
});
