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
  
    const maxTilt = 8; // degrees - reduced for subtlety
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const midX = rect.width / 2;
        const midY = rect.height / 2;
  
        const rotateY = ((x - midX) / midX) * maxTilt;
        const rotateX = ((midY - y) / midY) * maxTilt;
  
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        card.style.boxShadow =
          "0 32px 72px rgba(0, 0, 0, 0.75), 0 0 40px rgba(168, 228, 255, 0.4)";
      });
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        card.style.boxShadow = "";
        card.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      });
      
      card.addEventListener("mouseenter", () => {
        card.style.transition = "none";
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
  