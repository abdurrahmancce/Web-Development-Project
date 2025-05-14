AOS.init();

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  document.querySelector('.theme-toggle').textContent = current === 'light' ? '☀️' : '🌙';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thanks for reaching out!');
});
