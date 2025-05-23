document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastmod').textContent = document.lastModified;

function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

window.addEventListener('load', () => {
  const temp = parseFloat(document.getElementById('temp').textContent);
  const speed = parseFloat(document.getElementById('speed').textContent);
  let wc = 'N/A';

  if (temp <= 10 && speed > 4.8) {
    wc = calculateWindChill(temp, speed);
  }

  document.getElementById('windchill').textContent = wc;
});