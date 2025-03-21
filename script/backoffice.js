//Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateFooter();

class ShopItem {
  constructor(_name, _description, _price, _imageUrl, _brand) {
    this.name = _name;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
    this.brand = _brand;
  }
}

const URLparameters = new URLSearchParams(location.search);
const itemID = URLparameters.get("id");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
// Removed monsterInput
const imageUrlInput = document.getElementById("imageUrl"); // Added this input
const priceInput = document.getElementById("price");
const brandInput = document.getElementById("brand"); // Added this input

const productURL = "https://striveschool-api.herokuapp.com/api/product";

if (itemID) {
  fetch(productURL + "/" + itemID)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      imageUrlInput.value = data.imageUrl; // Set imageUrl field
      priceInput.value = data.price;
      brandInput.value = data.brand; // Set brand field
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const form = document.getElementById("item-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newItem = new ShopItem(
    nameInput.value,
    descriptionInput.value,
    parseFloat(priceInput.value), // Ensure price is a number
    imageUrlInput.value, // Added imageUrl
    brandInput.value // Added brand
  );

  console.log("NEW ITEM", newItem);

  // Save to the DB

  let methodToUse;
  let URLtoUse;

  if (itemID) {
    methodToUse = "PUT";
    URLtoUse = productURL + "/" + itemID;
  } else {
    methodToUse = "POST";
    URLtoUse = productURL;
  }

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(newItem),
    headers: {
      "Content-Type": "application/json", // Ensure content type is correct
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDI1NDc4MzEsImV4cCI6MTc0Mzc1NzQzMX0.Q4xSc4mZgUIHI4V4U51iyFFW96LvAkLylYjDRlTDPvc",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Salvataggio completato!");
        form.reset();
      } else {
        throw new Error("ERRORE BACKEND");
      }
    })
    .catch((error) => {
      console.log("ERRORE", error);
    });
});

// Pulsante di eliminazione del prodotto
const deleteButton = document.getElementById("delete-button");
if (deleteButton) {
  deleteButton.addEventListener("click", function () {
    if (itemID) {
      fetch(productURL + "/" + itemID, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDI1NDc4MzEsImV4cCI6MTc0Mzc1NzQzMX0.Q4xSc4mZgUIHI4V4U51iyFFW96LvAkLylYjDRlTDPvc",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Prodotto eliminato con successo!");
          } else {
            throw new Error("Errore nella cancellazione");
          }
        })
        .catch((error) => {
          console.log("ERRORE", error);
        });
    }
  });
}
