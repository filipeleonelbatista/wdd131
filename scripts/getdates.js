const yearEl = document.getElementById('currentYear');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
const lastEl = document.getElementById('lastModified');
if (lastEl) { lastEl.textContent = `Last Modification: ${new Date(document.lastModified).toLocaleString('en-GB')}`; }

const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
const lastMod = document.getElementById('lastModified');
if (lastMod) {
    lastMod.textContent = `Last Modified: ${document.lastModified}`;
}
