// ============================================================
// Syed Abdul Wahab — Portfolio interactions
// ============================================================

// ---------- Nav: scrolled state ----------
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Animated stat counters ----------
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-num').forEach((el) => statObserver.observe(el));

// ---------- Project filters ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const platforms = card.dataset.platforms.split(' ');
      const show = filter === 'all' || platforms.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ---------- Live Apple Watch clock ----------
const watchTime = document.getElementById('watchTime');
const updateWatch = () => {
  if (!watchTime) return;
  const now = new Date();
  let h = now.getHours() % 12;
  if (h === 0) h = 12;
  const m = now.getMinutes().toString().padStart(2, '0');
  watchTime.textContent = `${h}:${m}`;
};
updateWatch();
// re-sync at the top of the next minute, then every minute
setTimeout(() => {
  updateWatch();
  setInterval(updateWatch, 60 * 1000);
}, (60 - new Date().getSeconds()) * 1000);

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
