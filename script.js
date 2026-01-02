
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


const target = document.getElementById("type-target");

function prefersReducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Check if the element exists
if (target) {
 
  target.textContent = "";

  const text = "Hey, I’m Daksh Desai.";

  if (prefersReducedMotion()) {
    // No animation: just set the text
    target.textContent = text;
  } else {
    // Animation enabled: type it out
    let i = 0;
    
    // Define the function
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
// Spotlight effect: Track mouse position over the grid
const grid = document.querySelector(".grid");
const cards = document.querySelectorAll(".card");

if (grid) {
  grid.onmousemove = (e) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Save these coordinates as CSS variables on the card
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };
}