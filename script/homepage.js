//Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateFooter();

const getShopItems = function () {
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

      const row = document.getElementById("shop-cards");
      row.innerHTML = ""; // Pulisce i contenuti esistenti

      data.forEach((item) => {
        row.innerHTML += `
           <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
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
      });
    })
    .catch((error) => {
      console.error("ERRORE:", error);
    });
};

getShopItems();
