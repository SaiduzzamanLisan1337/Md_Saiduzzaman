(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var sidenav = document.getElementById("sidenav");

  if (toggle && sidenav) {
    toggle.addEventListener("click", function () {
      var isOpen = sidenav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the mobile menu after choosing a section.
    sidenav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        sidenav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-spy: highlight the nav link for the section in view.
  var sections = Array.prototype.slice.call(document.querySelectorAll(".block[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".sidenav a"));

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var linkFor = {};
    navLinks.forEach(function (link) {
      linkFor[link.getAttribute("href").slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkFor[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
