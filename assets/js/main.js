// Initialize scroll animations and small UI helpers
AOS.init({
  once: true,
  offset: 80,
  duration: 700,
  easing: "ease-out-quad",
});

// Render an ambient, autonomous neural network behind the page content.
const neuralNetwork = document.getElementById("neural-network");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (neuralNetwork && window.particlesJS && !prefersReducedMotion) {
  window.particlesJS("neural-network", {
    particles: {
      number: {
        value: 145,
        density: { enable: true, value_area: 700 },
      },
      color: { value: "#60e0ff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.65,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.25, sync: false },
      },
      size: {
        value: 2.8,
        random: true,
        anim: { enable: true, speed: 1, size_min: 1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 145,
        color: "#60e0ff",
        opacity: 0.38,
        width: 1.1,
      },
      move: {
        enable: true,
        speed: 0.35,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
        attract: { enable: true, rotateX: 900, rotateY: 1800 },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: false, mode: "repulse" },
        onclick: { enable: false, mode: "push" },
        resize: true,
      },
    },
    retina_detect: true,
  });
}

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scroll fallback for browsers that ignore CSS property
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const navEl = document.querySelector(".nav");
const navContainer = navEl?.querySelector("nav");
const navOffset = () => (navEl ? navEl.getBoundingClientRect().height : 0);
const isMobileNav = () => window.innerWidth <= 720;

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset() - 8;
      window.scrollTo({ top, behavior: "smooth" });
      const id = targetId.replace("#", "");
      if (id) setActive(id, { fromScroll: false });
    }
  });
});

// Highlight active section in nav on scroll
const sections = Array.from(document.querySelectorAll("section[id]"));
let activeId = null;
const setActive = (id, { fromScroll = false } = {}) => {
  if (id === activeId) return;
  activeId = id;
  navLinks.forEach((l) => {
    const isActive = l.getAttribute("href") === `#${id}`;
    l.classList.toggle("active", isActive);
    if (isActive && isMobileNav() && navContainer) {
      const behavior = fromScroll ? "smooth" : "smooth";
      l.scrollIntoView({ behavior, inline: "center", block: "nearest" });
    }
  });
};

const updateActiveByScroll = () => {
  if (!sections.length) return;

  const scrollPos = window.scrollY + navOffset() + 8;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop - 1) currentId = section.id;
  });

  const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
  if (nearBottom) {
    currentId = sections[sections.length - 1].id;
  }

  setActive(currentId, { fromScroll: true });
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  window.requestAnimationFrame(() => {
    updateActiveByScroll();
    ticking = false;
  });
  ticking = true;
});

window.addEventListener("resize", () => {
  updateActiveByScroll();
});

// Default highlight on page load
updateActiveByScroll();

// Subtle parallax on hero visual
const orb = document.querySelector(".orb");
window.addEventListener("mousemove", (e) => {
  if (!orb) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 16;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  orb.style.transform = `translate(${x}px, ${y}px)`;
});
