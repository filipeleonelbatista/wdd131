const yearEl = document.getElementById('currentYear');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
const lastEl = document.getElementById('lastModified');
if (lastEl) { lastEl.textContent = `Last Modification: ${document.lastModified}`; }

const btn = document.getElementById('hamburgerBtn');
const header = document.querySelector('header');
const nav = document.querySelector('nav');

btn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  header.classList.toggle('open', isOpen);
  btn.textContent = isOpen ? '✕' : '☰';
});