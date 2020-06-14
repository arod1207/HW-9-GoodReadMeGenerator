const axios = require('axios');
const inquirer = require('inquirer')

let userName = "NijTeck"

axios
  .get(`https://api.github.com/users/${userName}/repos?per_page=100`)
  .then(function (response) {
    // handle success
    console.log(response);
    console.log("Retrieved user data")
    let user = response.data[0].owner.login;
    let picture = response.data[0].owner.avatar_url;

    console.log(user);
    console.log(picture);
    

   
   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log("There was an error retrieving user data")
  })
  .finally(function () {
    // always executed
  });

  