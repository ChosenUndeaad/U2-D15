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
      row.innerHTML = "";

      data.forEach((item) => {
        row.innerHTML += `
            <div class="card" style="width: 18rem;">
              <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          `;
      });
    })
    .catch((error) => {
      console.error("ERRORE:", error);
    });
};
