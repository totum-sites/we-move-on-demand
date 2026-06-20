/**
 * Converts preloaded Google Fonts stylesheets to applied stylesheets once they
 * finish loading. Fallback for no-JS users is provided via <noscript>.
 */
(function () {
  const links = document.querySelectorAll('link[rel="preload"][as="style"]');
  links.forEach(function (link) {
    link.onload = null;
    link.rel = 'stylesheet';
  });
})();
