const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const target = document.getElementById("type-target");

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Typing Effect
if (target) {
  target.textContent = "";
  const text = "Hey, I’m Daksh Desai.";

  if (prefersReducedMotion()) {
    target.textContent = text;
  } else {
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); 
      }
    };
    typeWriter();
  }
}

// --- SPOTLIGHT EFFECT FIX ---
const grid = document.querySelector(".grid");
const cards = document.querySelectorAll(".card");

if (grid) {
  // 1. Mouse move: Update coordinates
  grid.addEventListener("mousemove", (e) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  });

  // 2. Optional: Clear the light when mouse leaves the grid
  // This prevents the "last known position" from staying lit
  grid.addEventListener("mouseleave", () => {
    for (const card of cards) {
      // Move light way off screen
      card.style.setProperty("--mouse-x", "-1000px");
      card.style.setProperty("--mouse-y", "-1000px");
    }
  });
}