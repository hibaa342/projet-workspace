document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const navbar = document.getElementById('navbar');

  if (!toggle || !navbar) return;

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    document.body.classList.toggle('nav-open');
  });

  navbar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
    });
  });
});
