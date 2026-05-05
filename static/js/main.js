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
