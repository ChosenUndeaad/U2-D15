//Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateFooter();

class shopItem {
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
