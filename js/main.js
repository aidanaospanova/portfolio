// MAIN INTERACTION
document.addEventListener("DOMContentLoaded", () => {
    setupReveal();
    setupTiltCards();
    setupCursor();
  });
  
  // Intersection Observer for .reveal
  function setupReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !reveals.length) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
  
    reveals.forEach((el) => observer.observe(el));
  }
  
  // Simple 3D tilt on cards
  function setupTiltCards() {
    const cards = document.querySelectorAll(".tilt");
    if (!cards.length) return;
  
    const maxTilt = 10; // degrees
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
  
        const rotateY = ((x - midX) / midX) * maxTilt;
        const rotateX = ((midY - y) / midY) * maxTilt;
  
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.boxShadow =
          "0 28px 60px rgba(0, 0, 0, 0.72), 0 0 34px rgba(168, 228, 255, 0.45)";
      });
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
        card.style.boxShadow = "";
      });
    });
  }
  
  // Custom cursor with ring that responds to links/buttons
  function setupCursor() {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;
  
    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
  
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
  
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });
  
    // Smooth follow for ring
    function animate() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  
    // Grow ring on interactive elements
    const interactiveSelectors = [
      "a",
      "button",
      ".btn",
      ".project-card",
      ".hero-3d-card",
    ];
    const interactive = document.querySelectorAll(interactiveSelectors.join(","));
  
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });
  
    document.addEventListener("mouseleave", () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    });
  
    document.addEventListener("mouseenter", () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    });
  }
  