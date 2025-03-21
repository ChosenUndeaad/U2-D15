// Sample data
const sampleData = [
  {
    name: "Blackveil Hazak Alpha +",
    description:
      "Blackveil Hazak Alpha + Armor Set in Monster Hunter World (MHW) mhw-iceborne-icon-16pxIceborne is a Master Rank Armor Set added with the expansion. Sets are comprised of five different pieces, and can be complemented with Decorations, Charms, Weapons and Mantles. s have special effects when equipped, and combine Skills depending on the pieces equipped.",
    price: 105000,
    imageUrl:
      "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/blackveil-hazak-alpha-plus-mhw-wiki-guide.png",
  },
  {
    name: "Raging Brachy Alpha +",
    description:
      "Raging Brachy Alpha + Armor Set in Monster Hunter World (MHW) mhw-iceborne-icon-16pxIceborne is a Master Rank Armor Set added with the expansion. Sets are comprised of five different pieces, and can be complemented with Decorations, Charms, Weapons and Mantles. s have special effects when equipped, and combine Skills depending on the pieces equipped.",
    price: 120000,
    imageUrl:
      "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/raging-brachy-alpha-mhw-wiki-guide1.png",
  },
  {
    name: "Savage Jho Alpha +",
    description:
      "Savage Jho Alpha + Armor Set in Monster Hunter World (MHW) mhw-iceborne-icon-16pxIceborne is a Master Rank Armor Set added with the expansion. Sets are comprised of five different pieces, and can be complemented with Decorations, Charms, Weapons and Mantles. s have special effects when equipped, and combine Skills depending on the pieces equipped.",
    price: 105000,
    imageUrl:
      "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/savage-jho-alpha-plus-set-mhw-wiki-guide.png",
  },
];

// Anno
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateFooter();

const getShopItems = function () {
  const row = document.getElementById("shop-cards");

  // Card template
  const createCard = (item) => {
    return `
      <div class="col col-12 col-lg-3 col-md-4 col-sm-6" id="item-${item._id}">
        <div class="card">
          <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">${item.price} Z</p>
            <a href="./details.html?id=${item._id}" class="btn btn-danger">Dettagli</a>
          </div>
        </div>
      </div>
    `;
  };

  // Sample data
  sampleData.forEach((item, index) => {
    item._id = `sample-${index + 1}`;
    row.innerHTML += createCard(item);
  });

  //API
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDI1NDc4MzEsImV4cCI6MTc0Mzc1NzQzMX0.Q4xSc4mZgUIHI4V4U51iyFFW96LvAkLylYjDRlTDPvc",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: Failed to fetch data");
      }
    })
    .then((data) => {
      console.log("Dati ricevuti:", data);

      data.forEach((item) => {
        row.innerHTML += createCard(item);
      });
    })
    .catch((error) => {
      console.error("ERRORE:", error);
    });
};

getShopItems();
