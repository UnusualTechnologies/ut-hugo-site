/**
 * Theme switcher
 * - Dark is the default theme
 * - Health-science pages default to light if no stored preference
 * - User preference is saved to localStorage and persists across pages
 */
(function () {
  var STORAGE_KEY = 'ut-theme';

  function getPreferred() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Update toggle button label if it exists
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      var isLight = theme === 'light';
      btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      btn.querySelector('.icon-sun').style.display = isLight ? 'none' : 'block';
      btn.querySelector('.icon-moon').style.display = isLight ? 'block' : 'none';
    }
  }

  function toggle() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  }

  // Determine initial theme
  var stored = getPreferred();
  if (stored) {
    apply(stored);
  } else {
    // No stored preference: health-science pages default to light
    var isHealthScience = document.body && document.body.classList.contains('health-science');
    var defaultTheme = isHealthScience ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, defaultTheme);
    apply(defaultTheme);
  }

  // Expose toggle globally for the footer button
  window.toggleTheme = toggle;
})();
