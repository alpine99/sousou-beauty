const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dots span')];
let current = 0;

function setSlide(index) {
  if (!slides.length) return;
  slides[current].classList.remove('is-active');
  dots[current]?.classList.remove('active');
  current = index;
  slides[current].classList.add('is-active');
  dots[current]?.classList.add('active');
}

if (slides.length > 1) {
  setInterval(() => setSlide((current + 1) % slides.length), 5200);
}

dots.forEach((dot, index) => dot.addEventListener('click', () => setSlide(index)));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
});

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));