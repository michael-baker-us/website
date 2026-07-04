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

// ---------- nav border on scroll ----------
const nav = document.getElementById("nav");
addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 12);
}, { passive: true });

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

// ---------- footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
