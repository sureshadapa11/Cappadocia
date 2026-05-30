// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(26,26,26,0.99)';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    nav.style.background = 'rgba(26,26,26,0.95)';
    nav.style.boxShadow = 'none';
  }
});

// Menu tabs
function showMenu(sectionId, btn) {
  document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');
  btn.classList.add('active');
}

// Menu card lightbox
function openMenuCard() {
  document.getElementById('menuLightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenuCard() {
  document.getElementById('menuLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenuCard();
});

// Gallery filter
function showGallery(cat, btn) {
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const expanded = !document.querySelector('.gallery-item.gallery-extra[style*="display: block"]') === false
    || document.getElementById('galleryMoreBtn').textContent.includes('Show Less');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const catMatch = cat === 'all' || item.dataset.cat === cat;
    const isExtra = item.classList.contains('gallery-extra');
    if (!catMatch) {
      item.style.display = 'none';
    } else if (isExtra) {
      item.style.display = expanded ? 'block' : 'none';
    } else {
      item.style.display = 'block';
    }
  });
}

// Gallery View More toggle
function toggleGalleryExtra(btn) {
  const extras = document.querySelectorAll('.gallery-item.gallery-extra');
  const activeTab = document.querySelector('.gallery-tab.active');
  const cat = activeTab ? activeTab.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';
  const showing = btn.textContent.includes('View More');
  extras.forEach(item => {
    const catMatch = cat === 'all' || item.dataset.cat === cat;
    item.style.display = (showing && catMatch) ? 'block' : 'none';
  });
  btn.textContent = showing ? 'Show Less' : 'View More Photos';
}

// Reservation form
function submitReservation(e) {
  e.preventDefault();
  document.getElementById('reservationForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// Set minimum date for reservation to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.value = today;
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-card, .review-card, .info-card, .about-text, .special-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
