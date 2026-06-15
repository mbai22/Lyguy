const icons = {
  menu: '<i class="ph ph-list" style="font-size:24px"></i>',
  x: '<i class="ph ph-x" style="font-size:24px"></i>',
};

let currentPage = 'home';
let carouselIntervals = [];
let scrollObserver = null;

function showToast(title, desc) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-desc">${desc}</div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)'; toast.style.transition = 'all 0.3s'; }, 3000);
  setTimeout(() => toast.remove(), 3300);
}

function navigate(page) {
  if (page !== 'home') {
    carouselIntervals.forEach(id => clearInterval(id));
    carouselIntervals = [];
  }
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`page-${page}`);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('menu-toggle').classList.remove('open');
  document.getElementById('menu-toggle').innerHTML = icons.menu;
  if (page === 'home') initCarousels();
  initScrollAnimations();
}

function handleContact(e) {
  e.preventDefault();
  showToast('Demande envoyée', 'Nous vous répondrons dans les plus brefs délais.');
  e.target.reset();
}

function initScrollAnimations() {
  if (scrollObserver) scrollObserver.disconnect();
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => scrollObserver.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
}

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  let open = false;
  toggle.addEventListener('click', () => {
    open = !open;
    menu.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.innerHTML = open ? icons.x : icons.menu;
  });
}

function initToasts() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toast]');
    if (btn) {
      const [title, desc] = btn.dataset.toast.split('|');
      showToast(title, desc);
    }
  });
}

function initForms() {
  const cf = document.getElementById('contact-form');
  if (cf) cf.addEventListener('submit', handleContact);
}

function initCarousels() {
  carouselIntervals.forEach(id => clearInterval(id));
  carouselIntervals = [];

  function initActusCarousel() {
    const container = document.getElementById('actusCarousel');
    if (!container || container.children.length < 2) return;
    const slides = container.children;
    const dotsContainer = document.getElementById('actusDots');
    dotsContainer.innerHTML = '';
    const isMob = window.innerWidth < 768;
    const visible = isMob ? 1 : 3;
    const maxPos = slides.length - visible;

    function getPositions() {
      return Array.from(slides).map(s => s.offsetLeft);
    }

    function getCurrentIndex() {
      const positions = getPositions();
      const scrollPos = container.scrollLeft;
      for (let i = positions.length - 1; i >= 0; i--) {
        if (scrollPos >= positions[i] - 5) return i;
      }
      return 0;
    }

    function updateDots() {
      const current = getCurrentIndex();
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    for (let i = 0; i <= maxPos; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        container.scrollTo({ left: getPositions()[i], behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }

    container.addEventListener('scroll', updateDots);

    const id = setInterval(() => {
      const current = getCurrentIndex();
      const next = (current + 1) % (maxPos + 1);
      container.scrollTo({ left: getPositions()[next], behavior: 'smooth' });
    }, 4000);
    carouselIntervals.push(id);
  }

  function initGalleryCarousel() {
    const container = document.getElementById('homeGallery');
    if (!container) return;
    const isGrid = getComputedStyle(container).display === 'grid';
    if (isGrid) return;
    const slides = container.children;
    if (slides.length < 2) return;
    const dotsContainer = document.getElementById('galleryDots');
    dotsContainer.innerHTML = '';
    const maxPos = slides.length - 1;

    function getPositions() {
      return Array.from(slides).map(s => s.offsetLeft);
    }

    function getCurrentIndex() {
      const positions = getPositions();
      const scrollPos = container.scrollLeft;
      for (let i = positions.length - 1; i >= 0; i--) {
        if (scrollPos >= positions[i] - 5) return i;
      }
      return 0;
    }

    function updateDots() {
      const current = getCurrentIndex();
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    for (let i = 0; i <= maxPos; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        container.scrollTo({ left: getPositions()[i], behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }

    container.addEventListener('scroll', updateDots);

    const id = setInterval(() => {
      const current = getCurrentIndex();
      const next = (current + 1) % (maxPos + 1);
      container.scrollTo({ left: getPositions()[next], behavior: 'smooth' });
    }, 4000);
    carouselIntervals.push(id);
  }

  function initBoutiqueCarousel() {
    const container = document.getElementById('boutiqueCarousel');
    if (!container) return;
    const isGrid = getComputedStyle(container).display === 'grid';
    if (isGrid) return;
    const slides = container.children;
    if (slides.length < 2) return;
    const dotsContainer = document.getElementById('boutiqueDots');
    dotsContainer.innerHTML = '';
    const maxPos = slides.length - 1;

    function getPositions() {
      return Array.from(slides).map(s => s.offsetLeft);
    }

    function getCurrentIndex() {
      const positions = getPositions();
      const scrollPos = container.scrollLeft;
      for (let i = positions.length - 1; i >= 0; i--) {
        if (scrollPos >= positions[i] - 5) return i;
      }
      return 0;
    }

    function updateDots() {
      const cur = getCurrentIndex();
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    }

    for (let i = 0; i <= maxPos; i++) {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.addEventListener('click', () => {
        container.scrollTo({ left: getPositions()[i], behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }

    container.addEventListener('scroll', updateDots);

    const id = setInterval(() => {
      const cur = getCurrentIndex();
      const next = (cur + 1) % (maxPos + 1);
      container.scrollTo({ left: getPositions()[next], behavior: 'smooth' });
    }, 4000);
    carouselIntervals.push(id);
  }

  function initArrows() {
    document.querySelectorAll('.carousel-arrow').forEach(btn => {
      btn.addEventListener('click', () => {
        const container = document.getElementById(btn.dataset.carousel);
        const isGrid = getComputedStyle(container).display === 'grid';
        if (isGrid) return;
        const dotsContainer = container.parentElement.querySelector('.carousel-dots');
        const dir = parseInt(btn.dataset.dir);
        const slides = container.children;
        const isMob = window.innerWidth < 768;
        const visible = container.id === 'actusCarousel' ? (isMob ? 1 : 3) : 1;
        const maxPos = slides.length - visible;
        const positions = Array.from(slides).map(s => s.offsetLeft);
        const scrollPos = container.scrollLeft;
        let curIdx = 0;
        for (let i = positions.length - 1; i >= 0; i--) {
          if (scrollPos >= positions[i] - 5) { curIdx = i; break; }
        }
        curIdx = Math.min(curIdx, maxPos);
        let next = curIdx + dir;
        if (next < 0) next = maxPos;
        if (next > maxPos) next = 0;
        container.scrollTo({ left: positions[next], behavior: 'smooth' });
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === next));
      });
    });
  }

  initActusCarousel();
  initGalleryCarousel();
  initBoutiqueCarousel();
  initArrows();
}

function copyLink() {
  const el = document.getElementById('copyConfirm');
  if (!el) return;
  el.style.display = 'inline-flex';
  setTimeout(() => { el.style.display = 'none'; }, 2500);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeader();
  initMobileMenu();
  initToasts();
  initForms();
  initCarousels();
});