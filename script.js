/* ============ Cyber-Academic Portfolio â script.js ============ */
"use strict";

/* ---------- boot sequence ---------- */
const bootLines = [
  ["init", "SM-PORTFOLIO v3.0 :: secure boot sequence"],
  ["dim", "[ 0.000042] loading kernel modules ...................... ok"],
  ["dim", "[ 0.000108] mounting /research/ai_cybersecurity ........ ok"],
  ["ok",   "[ 0.000231] intrusion detection systems ............... ONLINE"],
  ["ok",   "[ 0.000318] adversarial defense protocols ............. ONLINE"],
  ["ok",   "[ 0.000402] credential: M.Sc. AI @ KCGI .............. VERIFIED"],
  ["init", "> ACCESS GRANTED â welcome, professor_"]
];
const bootLog = document.getElementById("bootLog");
const bootBar = document.querySelector(".boot-bar span");
const preloader = document.getElementById("preloader");
let bootDone = false;
(function boot(i = 0) {
  if (i >= bootLines.length) {
    bootBar.style.width = "100%";
    setTimeout(() => { preloader.classList.add("done"); bootDone = true; startHero(); }, 500);
    return;
  }
  const [cls, text] = bootLines[i];
  const div = document.createElement("div");
  div.className = cls;
  div.textContent = text;
  bootLog.appendChild(div);
  bootBar.style.width = ((i + 1) / bootLines.length * 100) + "%";
  setTimeout(() => boot(i + 1), 190);
})();
setTimeout(() => { preloader.classList.add("done"); if (!bootDone) startHero(); }, 4000); // safety

/* ---------- hero effects after boot ---------- */
let heroStarted = false;
function startHero() {
  if (heroStarted) return; heroStarted = true;
  typeCommand("cat profile --verbose");
  setTimeout(() => scrambleTo(document.getElementById("taglineDecrypt"),
    "AI Â· MACHINE LEARNING Â· CYBERSECURITY"), 900);
}
function typeCommand(cmd) {
  const el = document.getElementById("bootCmd");
  let i = 0;
  (function tick() { el.textContent = cmd.slice(0, ++i); if (i < cmd.length) setTimeout(tick, 55); })();
}

/* ---------- text scramble / decrypt effect ---------- */
const CHARS = "!<>-_\\/[]{}â=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function scrambleTo(el, target) {
  let frame = 0, total = 24;
  (function step() {
    let out = "";
    for (let i = 0; i < target.length; i++) {
      const progress = frame / total * target.length - i * 0.9;
      out += progress > 0.4
        ? target[i]
        : CHARS[Math.floor(Math.random() * CHARS.length)];
    }
    el.textContent = out;
    if (frame++ < total) requestAnimationFrame(step); else el.textContent = target;
  })();
}
// decrypt section headings on reveal
const scrambleIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    scrambleIO.unobserve(e.target);
    e.target.querySelectorAll("h2.scramble").forEach(h => scrambleTo(h, h.dataset.text || h.textContent));
  });
}, { threshold: .4 });
document.querySelectorAll("section").forEach(s => scrambleIO.observe(s));

/* ---------- theme toggle (day mode) ---------- */
const themeBtn = document.getElementById("themeBtn");
const applyTheme = (t) => {
  document.body.dataset.theme = t;
  themeBtn.textContent = t === "dark" ? "â" : "â¾";
  try { localStorage.setItem("sm-theme", t); } catch (e) {}
};
let savedT = null;
try { savedT = localStorage.getItem("sm-theme"); } catch (e) {}
applyTheme(savedT || "dark");
themeBtn.addEventListener("click", () =>
  applyTheme(document.body.dataset.theme === "dark" ? "light" : "dark"));

/* ---------- scroll progress / header / back-top ---------- */
const progress = document.getElementById("progress");
const topbar = document.getElementById("topbar");
const backTop = document.getElementById("backTop");
addEventListener("scroll", () => {
  const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + "%";
  topbar.classList.toggle("scrolled", scrollY > 10);
  backTop.classList.toggle("show", scrollY > 500);
}, { passive: true });
backTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- mobile menu ---------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open")));

/* ---------- scrollspy ---------- */
const sections = [...document.querySelectorAll("section[id]")];
const links = [...navLinks.querySelectorAll('a[href^="#"]')];
addEventListener("scroll", () => {
  let current = "home";
  for (const s of sections) if (scrollY >= s.offsetTop - 130) current = s.id;
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
}, { passive: true });

/* ---------- animated counters ---------- */
const statIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    statIO.unobserve(e.target);
    e.target.querySelectorAll("b[data-count]").forEach(b => {
      const target = +b.dataset.count, t0 = performance.now(), dur = 1500;
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        b.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3)))).padStart(2, "0");
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  });
}, { threshold: .4 });
statIO.observe(document.getElementById("stats"));

/* ---------- reveal on scroll ---------- */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));

/* ---------- skill bars ---------- */
const barIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    barIO.unobserve(e.target);
    e.target.querySelectorAll(".track i").forEach(i => i.style.width = i.dataset.w + "%");
  });
}, { threshold: .3 });
document.querySelectorAll(".bars").forEach(el => barIO.observe(el));

/* ---------- chips stagger-in ---------- */
const chipIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    chipIO.unobserve(e.target);
    [...e.target.querySelectorAll(".chip")].forEach((c, i) =>
      setTimeout(() => c.classList.add("show"), i * 100));
  });
}, { threshold: .3 });
document.querySelectorAll(".chips").forEach(el => chipIO.observe(el));

/* ---------- publication filters ---------- */
const filterBtns = document.querySelectorAll(".fbtn");
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  document.querySelectorAll("#pubs .pub").forEach(card => {
    const match = f === "all" || card.dataset.type.includes(f);
    if (match) {
      card.classList.remove("gone");
      requestAnimationFrame(() => requestAnimationFrame(() => card.classList.remove("hide")));
    } else {
      card.classList.add("hide");
      setTimeout(() => card.classList.add("gone"), 350);
    }
  });
}));

/* ---------- 3D tilt ---------- */
if (!matchMedia("(hover:none)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform =
        `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}

/* ---------- magnetic buttons ---------- */
document.querySelectorAll(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * .18}px,${y * .3 - 2}px)`;
  });
  btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
});

/* ---------- custom cursor reticle ---------- */
const cursor = document.getElementById("cursor");
addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
}, { passive: true });
addEventListener("mouseover", e => {
  cursor.classList.toggle("hot", !!e.target.closest("a,button,.chip,.tag,.card"));
}, { passive: true });

/* ---------- hero id-card parallax ---------- */
const idcard = document.querySelector(".idcard");
addEventListener("mousemove", e => {
  const x = (e.clientX / innerWidth - .5) * 10, y = (e.clientY / innerHeight - .5) * 10;
  idcard.style.transform = `translate(${x}px,${y}px) rotateY(${x * .8}deg) rotateX(${-y * .8}deg)`;
}, { passive: true });

/* ---------- matrix rain ---------- */
const mCanvas = document.getElementById("matrix");
const mCtx = mCanvas.getContext("2d");
let cols = [], mW, mH;
const GLYPHS = "ã¢ã¤ã¦ã¨ãªã«ã­ã¯ã±ã³ãµã·ã¹ã»ã½0123456789ABCDEF<>/{}$#";
function mResize() {
  mW = mCanvas.width = innerWidth; mH = mCanvas.height = innerHeight;
  const n = Math.floor(mW / 16);
  cols = Array.from({ length: n }, () => Math.random() * mH);
}
mResize(); addEventListener("resize", mResize);
(function rain() {
  mCtx.fillStyle = "rgba(10,14,20,0.08)";
  mCtx.fillRect(0, 0, mW, mH);
  const dark = document.body.dataset.theme === "dark";
  mCtx.font = "13px monospace";
  cols.forEach((y, i) => {
    const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    mCtx.fillStyle = dark ? (Math.random() > .97 ? "#aef" : "rgba(0,229,255,.75)") : "rgba(8,102,168,.7)";
    mCtx.fillText(ch, i * 16, y);
    cols[i] = y > mH + Math.random() * 500 ? 0 : y + 16;
  });
  requestAnimationFrame(rain);
})();

/* ---------- network node map ---------- */
const nCanvas = document.getElementById("network");
const nCtx = nCanvas.getContext("2d");
let nodes = [], nW, nH;
function nResize() {
  nW = nCanvas.width = innerWidth; nH = nCanvas.height = innerHeight;
  const n = Math.min(46, Math.floor(nW / 26));
  nodes = Array.from({ length: n }, () => ({
    x: Math.random() * nW, y: Math.random() * nH,
    vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
    r: Math.random() * 1.8 + .8
  }));
}
nResize(); addEventListener("resize", nResize);
(function net() {
  nCtx.clearRect(0, 0, nW, nH);
  const dark = document.body.dataset.theme === "dark";
  const c = dark ? "0,229,255" : "8,102,168";
  for (const d of nodes) {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > nW) d.vx *= -1;
    if (d.y < 0 || d.y > nH) d.vy *= -1;
    nCtx.beginPath(); nCtx.arc(d.x, d.y, d.r, 0, 7);
    nCtx.fillStyle = "rgba(" + c + ",.55)"; nCtx.fill();
  }
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140) {
        nCtx.beginPath();
        nCtx.moveTo(nodes[i].x, nodes[i].y); nCtx.lineTo(nodes[j].x, nodes[j].y);
        nCtx.strokeStyle = "rgba(" + c + "," + (.18 * (1 - dist / 140)) + ")";
        nCtx.lineWidth = 1; nCtx.stroke();
      }
    }
  requestAnimationFrame(net);
})();

/* ---------- footer hex dump ---------- */
const hexEl = document.getElementById("hexDump");
setInterval(() => {
  let s = "";
  for (let i = 0; i < 6; i++) s += Math.floor(Math.random() * 256).toString(16).padStart(2, "0") + " ";
  hexEl.textContent = s;
}, 400);