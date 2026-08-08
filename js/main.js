// ESMEE GROUP INNOVATIONS — main.js

// Sticky header: solid on scroll
const header = document.querySelector('.site-header');
function onScrollHeader(){
  if(!header) return;
  if(window.scrollY > 40){ header.classList.add('solid'); }
  else{ header.classList.remove('solid'); }
}
window.addEventListener('scroll', onScrollHeader);
onScrollHeader();

// Thin orange scroll-progress bar under the header
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
function onScrollProgress(){
  const doc = document.documentElement;
  const scrolled = doc.scrollTop || document.body.scrollTop;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height > 0 ? (scrolled / height) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', onScrollProgress);
onScrollProgress();

// Scroll cue on the main hero (only the homepage full-screen hero)
const mainHero = document.querySelector('.hero');
if(mainHero){
  const cue = document.createElement('div');
  cue.className = 'scroll-cue';
  cue.textContent = 'Scroll';
  mainHero.appendChild(cue);
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

function closeNav(){
  navLinks.classList.remove('open');
  navOverlay.classList.remove('show');
  navToggle.textContent = '☰';
  document.body.style.overflow = '';
}
function openNav(){
  navLinks.classList.add('open');
  navOverlay.classList.add('show');
  navToggle.textContent = '✕';
  document.body.style.overflow = 'hidden';
}
if(navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  navOverlay.addEventListener('click', closeNav);
}

// Scroll reveal — staggers siblings that reveal together (grids of cards, etc.)
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach(el => {
  const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
  const idx = siblings.indexOf(el);
  if(siblings.length > 1){
    el.style.transitionDelay = Math.min(idx * 90, 360) + 'ms';
  }
});
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Lazy-load below-the-fold images (skip header/footer logo, keep those instant)
document.querySelectorAll('img').forEach(img => {
  if(!img.closest('.brand') && !img.closest('.footer-brand')){
    img.loading = 'lazy';
    img.decoding = 'async';
  }
});

// Animated stat counters
const counters = document.querySelectorAll('[data-count]');
function animateCounter(el){
  const target = parseFloat(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1600;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if(progress < 1){ requestAnimationFrame(tick); }
    else{ el.textContent = target + suffix; }
  }
  requestAnimationFrame(tick);
}
if('IntersectionObserver' in window && counters.length){
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCounter(entry.target);
        cio.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cio.observe(el));
}

// Contact form — submits to Formspree (see form's action= attribute in contact.html)
const contactForm = document.querySelector('#contact-form');
if(contactForm){
  const statusEl = contactForm.querySelector('#form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(contactForm.action.includes('YOUR_FORM_ID')){
      statusEl.textContent = 'Form not connected yet — replace YOUR_FORM_ID in contact.html with your real Formspree ID.';
      statusEl.style.color = '#c0392b';
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent = '';

    try{
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if(response.ok){
        statusEl.textContent = "Thanks — your message has been sent. We'll be in touch within 48 hours.";
        statusEl.style.color = '#2e7d32';
        contactForm.reset();
      } else {
        statusEl.textContent = 'Something went wrong sending your message. Please email us directly at esmeegroupinfo@gmail.com.';
        statusEl.style.color = '#c0392b';
      }
    } catch(err){
      statusEl.textContent = 'Network error — please email us directly at esmeegroupinfo@gmail.com.';
      statusEl.style.color = '#c0392b';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
