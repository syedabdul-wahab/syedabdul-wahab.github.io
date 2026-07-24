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

// ---------- Project screenshot galleries + lightbox ----------
// ZERO-CONFIG: to give a project a gallery, just drop images named
// 1.png, 2.png, 3.png ... into  assets/screenshots/<slug>/  (slug = the
// card's data-slug). They're detected automatically; 1.png is the card
// thumbnail and the rest fill the lightbox. No code changes needed.
//
// OPTIONAL: add nice captions per screenshot below (index 0 = 1.png).
// Any project without an entry just shows "Project — N / total".
const CAPTIONS = {
  'candy-box': [
    'Folder-based grids organize your quick actions',
    'Organize all the things you do the most',
    'Featured apps — popular apps continuously added',
    'Add some personality to your setup',
  ],
};

// Probe assets/screenshots/<slug>/1.png, 2.png ... until one is missing.
const probeGallery = (slug, max = 12) =>
  new Promise((resolve) => {
    const shots = [];
    const tryNext = (i) => {
      if (i > max) return resolve(shots);
      const img = new Image();
      const src = `assets/screenshots/${slug}/${i}.png`;
      img.onload = () => {
        shots.push({ src, cap: (CAPTIONS[slug] || [])[i - 1] || '' });
        tryNext(i + 1);
      };
      img.onerror = () => resolve(shots);
      img.src = src;
    };
    tryNext(1);
  });

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const lbDots = document.getElementById('lbDots');
let lbShots = [];
let lbIndex = 0;

const renderLb = () => {
  const shot = lbShots[lbIndex];
  if (!shot) return;
  lbImg.src = shot.src;
  lbImg.alt = shot.cap || '';
  lbCap.textContent = shot.cap || '';
  lbDots.querySelectorAll('.lb-dot').forEach((d, i) =>
    d.classList.toggle('active', i === lbIndex)
  );
};

const openLb = (shots, start = 0) => {
  lbShots = shots;
  lbIndex = start;
  lbDots.innerHTML = '';
  shots.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'lb-dot';
    dot.setAttribute('aria-label', `Go to screenshot ${i + 1}`);
    dot.addEventListener('click', () => { lbIndex = i; renderLb(); });
    lbDots.appendChild(dot);
  });
  renderLb();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLb = () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
const nextLb = () => { lbIndex = (lbIndex + 1) % lbShots.length; renderLb(); };
const prevLb = () => { lbIndex = (lbIndex - 1 + lbShots.length) % lbShots.length; renderLb(); };

document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbNext').addEventListener('click', nextLb);
document.getElementById('lbPrev').addEventListener('click', prevLb);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  else if (e.key === 'ArrowRight') nextLb();
  else if (e.key === 'ArrowLeft') prevLb();
});
// swipe support on the image
let touchX = null;
lbImg.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lbImg.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) (dx < 0 ? nextLb() : prevLb());
  touchX = null;
}, { passive: true });

// Auto-detect each project's screenshot folder + wire up gallery & badge
const camIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>';
document.querySelectorAll('.project-card').forEach(async (card) => {
  const slug = card.dataset.slug;
  const title = card.querySelector('h3')?.textContent.trim() || 'Project';
  const shots = await probeGallery(slug);
  if (!shots.length) return;
  // fill in fallback captions for any without a custom one
  shots.forEach((s, i) => { if (!s.cap) s.cap = `${title} — ${i + 1} / ${shots.length}`; });

  card.classList.add('has-gallery');
  const media = card.querySelector('.project-media');
  if (media) {
    const badge = document.createElement('span');
    badge.className = 'gallery-badge';
    badge.innerHTML = `${camIcon}${shots.length}`;
    media.appendChild(badge);
  }
  card.addEventListener('click', (e) => {
    if (e.target.closest('.appstore-link')) return; // let App Store link work
    openLb(shots, 0);
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
