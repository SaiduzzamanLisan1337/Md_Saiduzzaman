(function () {
  "use strict";

  var toggle = document.getElementById("navToggle");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");

  function closeMenu() {
    sidebar.classList.remove("open");
    scrim.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    sidebar.classList.add("open");
    scrim.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
  }

  if (toggle && sidebar && scrim) {
    toggle.addEventListener("click", function () {
      var isOpen = sidebar.classList.contains("open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });
    scrim.addEventListener("click", closeMenu);

    var links = sidebar.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeMenu);
    }
  }

  // Scroll-spy: highlight the nav link for whichever section is in view.
  var sections = Array.prototype.slice.call(document.querySelectorAll(".section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

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

  // Signal trace: a row of "normal" readings with one flagged point,
  // literally what the thesis is about. Built at runtime so it stays
  // crisp at any width; a deterministic pseudo-jitter keeps the baseline
  // organic without needing a real dataset.
  function jitter(seed) {
    var v = Math.sin(seed * 12.9898) * 43758.5453;
    return v - Math.floor(v);
  }

  var svg = document.getElementById("signalSvg");
  if (svg) {
    var NS = "http://www.w3.org/2000/svg";
    var W = 640, H = 96;
    var COUNT = 46;
    var BASE_Y = 68;
    var GUIDE_Y = 80;
    var ANOMALY_INDEX = Math.floor(COUNT * 0.63);

    var guide = document.createElementNS(NS, "line");
    guide.setAttribute("x1", "0");
    guide.setAttribute("y1", String(GUIDE_Y));
    guide.setAttribute("x2", String(W));
    guide.setAttribute("y2", String(GUIDE_Y));
    guide.setAttribute("class", "sig-guide");
    svg.appendChild(guide);

    for (var i = 0; i < COUNT; i++) {
      var x = (i + 0.5) * (W / COUNT);
      var isAnomaly = i === ANOMALY_INDEX;
      var y = isAnomaly ? 20 : BASE_Y - jitter(i) * 16;
      var r = isAnomaly ? 4.5 : 2;

      var dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", x.toFixed(2));
      dot.setAttribute("cy", y.toFixed(2));
      dot.setAttribute("r", String(r));
      dot.setAttribute("class", isAnomaly ? "sig-dot sig-anomaly" : "sig-dot");
      dot.style.animationDelay = (i * 13) + "ms";
      svg.appendChild(dot);

      if (isAnomaly) {
        var ring = document.createElementNS(NS, "circle");
        ring.setAttribute("cx", x.toFixed(2));
        ring.setAttribute("cy", y.toFixed(2));
        ring.setAttribute("r", String(r));
        ring.setAttribute("class", "sig-ring");
        svg.appendChild(ring);
      }
    }
  }
})();
