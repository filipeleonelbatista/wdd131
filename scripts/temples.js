const temples = [
    {
        templeName: "Belém Brazil",
        location: "Belém, Pará, Brazil",
        dedicated: "2022, November, 20",
        area: 28463,
        imageUrl: "images/belem-brazil.jpg"
    },
    {
        templeName: "Brasília Brazil",
        location: "Brasília, Distrito Federal, Brazil",
        dedicated: "2023, September, 17",
        area: 25600,
        imageUrl: "images/brasilia-brazil.jpg"
    },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, São Paulo, Brazil",
        dedicated: "2002, May, 17",
        area: 48480,
        imageUrl: "images/campinas-brazil.jpg"
    },
    {
        templeName: "Curitiba Brazil",
        location: "Curitiba, Paraná, Brazil",
        dedicated: "2008, June, 1",
        area: 33690,
        imageUrl: "images/curitiba-brazil.jpg"
    },
    {
        templeName: "Fortaleza Brazil",
        location: "Fortaleza, Ceará, Brazil",
        dedicated: "2019, June, 2",
        area: 37771,
        imageUrl: "images/fortaleza-brazil.jpg"
    },
    {
        templeName: "Manaus Brazil",
        location: "Manaus, Amazonas, Brazil",
        dedicated: "2012, June, 10",
        area: 32000,
        imageUrl: "images/manaus-brazil.jpg"
    },
    {
        templeName: "Porto Alegre Brazil",
        location: "Porto Alegre, Rio Grande do Sul, Brazil",
        dedicated: "2000, December, 17",
        area: 33402,
        imageUrl: "images/porto-alegre-brazil.jpg"
    },
    {
        templeName: "Recife Brazil",
        location: "Recife, Pernambuco, Brazil",
        dedicated: "2000, December, 15",
        area: 36500,
        imageUrl: "images/recife-brazil.jpg"
    },
    {
        templeName: "Rio de Janeiro Brazil",
        location: "Rio de Janeiro, Brazil",
        dedicated: "2022, May, 8",
        area: 29809,
        imageUrl: "images/rio-de-janeiro-brazil.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59860,
        imageUrl: "images/sao-paulo-brazil.jpg"
    }
];
const container = document.getElementById("temples-container");

function createTempleCard(temple) {
    return `
    <div class="temple-card">
      <img 
        src="${temple.imageUrl}" 
        alt="${temple.templeName} Temple" 
        loading="lazy"
        width="640"
        height="360"
      >
      <h2>${temple.templeName}</h2>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} ft²</p>
    </div>
  `;
}

function displayTemples(list) {
    // container.innerHTML = list.map(createTempleCard).join("");
    const main = document.getElementById("temples-container");

    if (list.length === 0) {
        main.classList.add("no-results");
        main.innerHTML = `
      <div class="no-results-message">
        <p>No temples found matching this filter.</p>
        <p>Please try a different filter or return to <a href="?filter=home">Home</a>.</p>
      </div>
    `;
    } else {
        main.classList.remove("no-results");
        main.innerHTML = list.map(createTempleCard).join("");
    }

}

function getYear(dedicatedStr) {
    return parseInt(dedicatedStr.split(",")[0]);
}

function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("filter") || "home";
}

function applyFilter() {
    const filter = getFilterFromURL();
    let filtered = temples;

    switch (filter) {
        case "old":
            filtered = temples.filter(t => getYear(t.dedicated) < 1900);
            break;
        case "new":
            filtered = temples.filter(t => getYear(t.dedicated) > 2000);
            break;
        case "large":
            filtered = temples.filter(t => t.area > 90000);
            break;
        case "small":
            filtered = temples.filter(t => t.area < 10000);
            break;
        case "home":
        default:
            filtered = temples;
    }

    displayTemples(filtered);
}

function highlightActiveFilter() {
    const currentFilter = getFilterFromURL();
    document.querySelectorAll("header nav a").forEach(link => {
        const url = new URL(link.href);
        const filterParam = url.searchParams.get("filter");
        if (filterParam === currentFilter) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

applyFilter();
highlightActiveFilter();