//Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateFooter();

class ShopItem {
  constructor(_name, _description, _monster, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.monster = _monster;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const nameInpupt = document.getElementById("name");
const descriptionInpupt = document.getElementById("description");
const monsterInpupt = document.getElementById("monster");
const imageUrlInpupt = document.getElementById("imageUrl");
const priceInpupt = document.getElementById("price");

const productUrl = "https://striveschool-api.herokuapp.com/api/product/";

if (itemID) {
  fetch(productUrl + "/" + itemID)
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
      monsterInput.value = data.monster;
      imageUrlInput.value = data.imageUrl;
      priceInput.value = data.price;
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
    monsterInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  console.log("NEW ITEM", newItem);

  //salviamolo nel DB

  let methodToUse;
  let URLtoUse;

  if (eventID) {
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
