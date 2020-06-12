const axios = require("axios");

let userName = "arod1207"

axios
  .get(`https://api.github.com/users/${userName}/repos?per_page=100`)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
