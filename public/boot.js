// Runs before first paint. Kept as a file (not inline) so the Content-Security-Policy can stay strict.
(function () {
  var d = document.documentElement;
  d.classList.add("js");
  if (location.pathname !== "/") d.setAttribute("data-route", "other");
  // Safety net: if the app bundle fails to load, never leave content hidden.
  setTimeout(function () {
    if (!window.__cloudiReady) {
      d.classList.remove("js");
      d.removeAttribute("data-route");
    }
  }, 4000);
})();
