// Runs before first paint. Kept as a file (not inline) so the Content-Security-Policy can stay strict.
(function () {
  var d = document.documentElement;
  var pre = ["/", "/about", "/services", "/privacy", "/terms"];
  var path = location.pathname.replace(/\/+$/, "") || "/";
  d.classList.add("js");
  if (pre.indexOf(path) === -1 && path.indexOf("/services/") !== 0) d.setAttribute("data-route", "other");
  // Safety net: if the app bundle fails to load, never leave content hidden.
  setTimeout(function () {
    if (!window.__cloudiReady) {
      d.classList.remove("js");
      d.removeAttribute("data-route");
    }
  }, 4000);
})();
