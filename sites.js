document.addEventListener('DOMContentLoaded', () => { //waits until the entire HTML document is loaded
  const toggle = document.getElementById('toggle');
  const navbar = document.getElementById('navbar');

  if (!toggle || !navbar) return; //If either toggle or navbar doesn’t exist the script stops immediately.

  //when you click on the toggle, it opens the nevbar and stop the body from moving
  toggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-open');
    document.body.classList.toggle('nav-open');
  });

  //the menu stops appearing when you choose where to go
  navbar.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
    });
  });
});
