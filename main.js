const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- hero ticker: cycling typed lines ----------
const LINES = [
  "improving engineering orgs through AI, platforms, and automation",
  "fixing the pipeline nobody owns",
  "landing the migration everyone avoids",
  "deleting toil, one internal tool at a time",
];

const typedEl = document.getElementById("typed");

if (reduceMotion) {
  typedEl.textContent = LINES[0];
} else {
  let line = 0;
  let char = 0;
  let deleting = false;

  function tick() {
    const current = LINES[line];

    if (!deleting) {
      char++;
      typedEl.textContent = current.slice(0, char);
      if (char === current.length) {
        deleting = true;
        setTimeout(tick, 2600);
        return;
      }
      setTimeout(tick, 34 + Math.random() * 40);
    } else {
      char -= 3;
      if (char <= 0) {
        char = 0;
        deleting = false;
        line = (line + 1) % LINES.length;
      }
      typedEl.textContent = current.slice(0, char);
      setTimeout(tick, deleting ? 14 : 500);
    }
  }

  setTimeout(tick, 600);
}

// ---------- staggered scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    // stagger only the elements entering together in this batch
    const entering = entries.filter((e) => e.isIntersecting);
    entering.forEach((entry, i) => {
      entry.target.style.setProperty("--reveal-delay", `${i * 70}ms`);
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

revealEls.forEach((el) => observer.observe(el));

// ---------- nav border + scroll progress ----------
const nav = document.getElementById("nav");
const progress = document.getElementById("progress");

addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 12);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.setProperty("--scroll", max > 0 ? scrollY / max : 0);
}, { passive: true });

// ---------- scroll spy: light the nav link for the section in view ----------
const spyLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)')];
const spySections = spyLinks
  .map((link) => document.querySelector(link.hash))
  .filter(Boolean);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = spyLinks.find((l) => l.hash === `#${entry.target.id}`);
      if (link) link.classList.toggle("active", entry.isIntersecting);
    });
  },
  { rootMargin: "-30% 0px -55% 0px" }
);

spySections.forEach((s) => spy.observe(s));

// ---------- cursor-tracking spotlight on cards ----------
if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".card, .experiment").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });
}

// ---------- magnetic hero buttons + glow drift ----------
if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
  // buttons lean a few pixels toward the cursor, then settle back
  document.querySelectorAll(".hero-actions .btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${dx * 0.12}px, ${dy * 0.22}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });

  // the ambient hero glow drifts gently opposite the pointer
  const glow = document.querySelector(".glow-hero");
  let glowRaf = null;
  addEventListener("pointermove", (e) => {
    if (glowRaf) return;
    glowRaf = requestAnimationFrame(() => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      glow.style.setProperty("--gx", `${nx * -28}px`);
      glow.style.setProperty("--gy", `${ny * -18}px`);
      glowRaf = null;
    });
  }, { passive: true });
}

// ---------- copy email ----------
const copyBtn = document.getElementById("copy-email");
const copyLabel = copyBtn.querySelector(".copy-label");
let copyTimer = null;

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
  } catch {
    return; // clipboard unavailable (e.g. non-secure context) — do nothing
  }
  copyBtn.classList.remove("copied");
  void copyBtn.offsetWidth; // restart the pop animation on repeat clicks
  copyBtn.classList.add("copied");
  copyLabel.textContent = "copied ✓";
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyBtn.classList.remove("copied");
    copyLabel.textContent = "copy";
  }, 1800);
});

// ---------- footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
