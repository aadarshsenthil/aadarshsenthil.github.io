// Initialize scroll animations and small UI helpers
AOS.init({
  once: true,
  offset: 80,
  duration: 700,
  easing: "ease-out-quad",
});

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scroll fallback for browsers that ignore CSS property
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Highlight active section in nav on scroll
const sections = document.querySelectorAll("section[id]");
const setActive = (id) => {
  navLinks.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      if (id) setActive(id);
    });
  },
  {
    rootMargin: "-30% 0px -40% 0px",
    threshold: 0.25,
  }
);

sections.forEach((section) => observer.observe(section));

// Default highlight on page load
if (sections.length) {
  setActive(sections[0].getAttribute("id"));
}

// Subtle parallax on hero visual
const orb = document.querySelector(".orb");
window.addEventListener("mousemove", (e) => {
  if (!orb) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  orb.style.transform = `translate(${x}px, ${y}px)`;
});
