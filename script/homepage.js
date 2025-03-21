const apiKey =
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJfaWQiOiI2N2RkMmI3NzM4MzRiZjAwMTUwMDA3MDMiLCJpYXQiOjE3NDI1NDc4MzEsImV4cCI6MTc0Mzc1NzQzMX0
    .Q4xSc4mZgUIHI4V4U51iyFFW96LvAkLylYjDRlTDPvc;

//Funzione per la data nel footer
const dateFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

dateFooter();

//
const getShopItems = function () {
  fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
};
