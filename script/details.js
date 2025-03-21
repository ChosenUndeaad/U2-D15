// Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};
dateFooter();

// URL per i prodotti
const itemsURL = "https://striveschool-api.herokuapp.com/api/product";

// Ottieni l'ID dell'elemento dalla query string dell'URL
const URLparameters = new URLSearchParams(location.search);
const itemID = URLparameters.get("id");

// Dati di esempio
const sampleData = [
  {
    _id: "sample-1",
    name: "Blackveil Hazak Alpha +",
    description:
      "Blackveil Hazak Alpha + Armor Set in Monster Hunter World (MHW) mhw-iceborne-icon-16pxIceborne is a Master Rank Armor Set added with the expansion. Sets are comprised of five different pieces, and can be complemented with Decorations, Charms, Weapons and Mantles. s have special effects when equipped, and combine Skills depending on the pieces equipped.",
    price: 105000,
    imageUrl:
      "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/blackveil-hazak-alpha-plus-mhw-wiki-guide.png",
  },
  {
    _id: "sample-2",
    name: "Raging Brachy Alpha +",
    description:
      "Raging Brachy Alpha + Armor Set in Monster Hunter World (MHW) mhw-iceborne-icon-16pxIceborne is a Master Rank Armor Set added with the expansion. Sets are comprised of five different pieces, and can be complemented with Decorations, Charms, Weapons and Mantles. s have special effects when equipped, and combine Skills depending on the pieces equipped.",
    price: 120000,
    imageUrl:
      "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/raging-brachy-alpha-mhw-wiki-guide1.png",
  },
  {
    _id: "sample-3",
    name: "Savage Jho Alpha +",
    description:
      "Savage Jho Alpha + Armor Set in Monster Hunter World (MHW) mhw-iceborne-icon-16pxIceborne is a Master Rank Armor Set added with the expansion. Sets are comprised of five different pieces, and can be complemented with Decorations, Charms, Weapons and Mantles. s have special effects when equipped, and combine Skills depending on the pieces equipped.",
    price: 105000,
    imageUrl:
      "https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/savage-jho-alpha-plus-set-mhw-wiki-guide.png",
  },
];

const getItemDetails = function () {
  const sampleItem = sampleData.find((item) => item._id === itemID);

  if (sampleItem) {
    // Se il prodotto è nei dati di esempio, mostriamo i dettagli
    console.log("Dettagli prodotto (da esempio):", sampleItem);
    document.getElementById("name").innerText = sampleItem.name;
    document.getElementById("description").innerText = sampleItem.description;
    document.getElementById("price").innerText = sampleItem.price + " Z";

    const imageElement = document.querySelector(".card-img-top");
    if (imageElement) {
      imageElement.src = sampleItem.imageUrl;
      imageElement.alt = sampleItem.name;
    }
  } else {
    // Recuperiamo i dettagli dal server
    fetch(itemsURL + "/" + itemID, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDI1NDc4MzEsImV4cCI6MTc0Mzc1NzQzMX0.Q4xSc4mZgUIHI4V4U51iyFFW96LvAkLylYjDRlTDPvc",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero dettagli");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dettagli prodotto (da server):", data);
        document.getElementById("name").innerText = data.name;
        document.getElementById("description").innerText = data.description;
        document.getElementById("price").innerText = data.price + " Z";

        // Aggiorna immagine del prodotto
        const imageElement = document.querySelector(".card-img-top");
        if (imageElement) {
          imageElement.src = data.imageUrl;
          imageElement.alt = data.name;
        }
      })
      .catch((error) => {
        console.error("Errore nel recupero dei dati", error);
      });
  }
};

// Funzione per modificare
const editItem = function () {
  if (itemID) {
    location.assign("./backoffice.html?id=" + itemID);
  } else {
    console.error("Item ID is missing.");
  }
};

// Funzione per eliminare
const deleteItem = function () {
  if (itemID) {
    if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
      fetch(itemsURL + "/" + itemID, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDI1NDc4MzEsImV4cCI6MTc0Mzc1NzQzMX0.Q4xSc4mZgUIHI4V4U51iyFFW96LvAkLylYjDRlTDPvc",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Eliminazione non riuscita");
          }
          alert("Prodotto eliminato con successo!");
          location.assign("./homepage.html");
        })
        .catch((error) => {
          console.error("Errore durante l'eliminazione", error);
        });
    }
  } else {
    console.error("Item ID is missing.");
  }
};

getItemDetails();
