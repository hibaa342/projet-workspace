document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle');
  const navbar = document.getElementById('navbar');

  if (!toggle || !navbar) return;

  toggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
  });

  // Fermer le menu quand on clique sur un lien (mobile)
  navbar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
    });
  });
});