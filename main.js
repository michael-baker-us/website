// Typing effect in the hero terminal
const LINES = [
  "whoami",
  "michael.baker — generalist engineer",
  "10y across QA · product · delivery · eng",
];

const typedEl = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  typedEl.textContent = LINES.join("  |  ");
} else {
  let line = 0;
  let char = 0;

  function type() {
    if (line >= LINES.length) return;
    const current = LINES[line];
    if (char <= current.length) {
      typedEl.textContent = current.slice(0, char);
      char++;
      setTimeout(type, 40 + Math.random() * 50);
    } else {
      line++;
      char = 0;
      if (line < LINES.length) setTimeout(type, 900);
    }
  }

  setTimeout(type, 400);
}

// Reveal sections as they scroll into view
const sections = document.querySelectorAll(".section, .card");
sections.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

sections.forEach((el) => observer.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
