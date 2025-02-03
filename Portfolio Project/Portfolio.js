
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  });
});

const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
      alert('Thank you for your message! I will respond shortly.');
      form.reset();
  } else {
      alert('Please fill in all required fields.');
  }
});