// Mobile navigation toggle (replaces the React useState menu in the original).
(function () {
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });
})();


/* =====================================================================
   Additions — scroll reveal, active nav link, developer Discord button,
   paint splats on click. (The mobile menu code above is unchanged.)
   ===================================================================== */

// Scroll reveal: sections fade/slide in as you reach them.
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) return; // no .js class => everything just shows
  document.documentElement.classList.add("js");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach(function (el) { io.observe(el); });
})();

// Highlight the nav link for the section you're currently reading.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var pairs = links.map(function (a) {
    return { link: a, target: document.getElementById(a.getAttribute("href").slice(1)) };
  }).filter(function (p) { return p.target; });
  if (!pairs.length) return;

  var ticking = false;
  function update() {
    ticking = false;
    var current = null;
    pairs.forEach(function (p) {
      // later sections win once their top has passed just under the header
      if (p.target.getBoundingClientRect().top <= 140) {
        if (!current || p.target.getBoundingClientRect().top >= current.target.getBoundingClientRect().top) current = p;
      }
    });
    pairs.forEach(function (p) { p.link.classList.toggle("is-active", p === current); });
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// Developer card: the personal Discord button only appears once a real link is pasted in.
(function () {
  document.querySelectorAll(".dev-server-link").forEach(function (a) {
    var href = (a.getAttribute("href") || "").trim();
    if (/^https?:\/\//i.test(href)) a.hidden = false;
  });
})();


  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a, button, summary, input, textarea, select, .game-hero, .site-header")) return;
    var splat = makeSplat(e.clientX, e.clientY);
    document.body.appendChild(splat);
    live.push(splat);
    if (live.length > 12) { var old = live.shift(); if (old.parentNode) old.parentNode.removeChild(old); }
    splat.addEventListener("animationend", function () {
      if (splat.parentNode) splat.parentNode.removeChild(splat);
      live = live.filter(function (n) { return n !== splat; });
    });
  });
})();
