const yearEl = document.getElementById('currentYear');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
const lastEl = document.getElementById('lastModified');
if (lastEl) { lastEl.textContent = `Last Modification: ${document.lastModified}`; }