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
let galleryExpanded = false;
let galleryCat = 'all';

function showGallery(cat, btn) {
  galleryCat = cat;
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const catMatch = cat === 'all' || item.dataset.cat === cat;
    const isExtra = item.classList.contains('gallery-extra');
    if (!catMatch) {
      item.style.display = 'none';
    } else if (isExtra) {
      item.style.display = galleryExpanded ? 'block' : 'none';
    } else {
      item.style.display = 'block';
    }
  });
}

// Gallery View More toggle
function toggleGalleryExtra(btn) {
  galleryExpanded = !galleryExpanded;
  document.querySelectorAll('.gallery-item.gallery-extra').forEach(item => {
    const catMatch = galleryCat === 'all' || item.dataset.cat === galleryCat;
    item.style.display = (galleryExpanded && catMatch) ? 'block' : 'none';
  });
  btn.textContent = galleryExpanded ? 'Show Less' : 'View More Photos';
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

// ── CART ──────────────────────────────────────────────
const WHATSAPP_NUMBER = '447700000000'; // replace when live number is ready
let cart = [];

// Inject "Add" button into every menu card on load
document.querySelectorAll('.menu-card').forEach(card => {
  const body = card.querySelector('.menu-card-body');
  if (!body) return;
  const btn = document.createElement('button');
  btn.className = 'add-to-cart-btn';
  btn.textContent = '+ Add';
  btn.onclick = () => addToCart(card, btn);
  body.appendChild(btn);
});

function addToCart(card, btn) {
  const name = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Item';
  const priceText = card.querySelector('.price') ? card.querySelector('.price').textContent.trim() : '';
  const price = parseFloat(priceText.replace('£', '')) || 0;
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  btn.textContent = '✓ Added';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = '+ Add'; btn.classList.remove('added'); }, 1200);
  updateCart();
  const floatBtn = document.getElementById('floatCartBtn');
  floatBtn.style.display = 'flex';
  floatBtn.classList.add('bounce');
  setTimeout(() => floatBtn.classList.remove('bounce'), 400);
}

function updateCart() {
  const badge = document.getElementById('cartBadge');
  const itemsEl = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  const empty = document.getElementById('cartEmpty');
  const totalEl = document.getElementById('cartTotal');
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = totalItems;
  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    footer.style.display = 'none';
    empty.style.display = 'flex';
    document.getElementById('floatCartBtn').style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  footer.style.display = 'block';
  itemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price > 0 ? '£' + item.price.toFixed(2) + ' each' : ''}</div>
      </div>
      <div class="cart-qty">
        <button onclick="changeQty(${idx}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${idx}, 1)">+</button>
      </div>
      <button class="cart-remove" onclick="removeItem(${idx})" title="Remove">✕</button>
    </div>
  `).join('');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.textContent = total > 0 ? 'Estimated Total: £' + total.toFixed(2) : '';
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCart();
}

function removeItem(idx) {
  cart.splice(idx, 1);
  updateCart();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function sendWhatsAppOrder() {
  if (cart.length === 0) return;
  const lines = cart.map(i => `- ${i.name} x${i.qty}${i.price > 0 ? ' (£' + i.price.toFixed(2) + ' each)' : ''}`).join('\n');
  const msg = `Hello, I would like to place an order.\n\nItems:\n${lines}\n\nPlease confirm availability and total price. Thank you.`;
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

// ── SCROLL PROGRESS + SCROLL TO TOP ────────────────────
const scrollTopBtn = document.getElementById('scrollTopBtn');
const ringFill = document.getElementById('scrollRingFill');
const circumference = 113.1;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? scrolled / total : 0;
  ringFill.style.strokeDashoffset = circumference * (1 - pct);
  if (scrolled > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ── FADE-IN ON SCROLL ──────────────────────────────────
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
