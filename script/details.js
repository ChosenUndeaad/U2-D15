// Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};
dateFooter();

const URLparameters = new URLSearchParams(location.search);
const itemID = URLparameters.get("id");
const itemsURL = "https://striveschool-api.herokuapp.com/api/product";

const getItemDetails = function () {
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
      console.log("Dettagli prodotto:", data);

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
};

// Funzione per modificare l'oggetto
const editItem = function () {
  location.assign("./backoffice.html?id=" + itemID);
};

// Funzione per eliminare l'oggetto con conferma
const deleteItem = function () {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(itemsURL + "/" + itemID, {
      method: "DELETE",
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
};

getItemDetails();
