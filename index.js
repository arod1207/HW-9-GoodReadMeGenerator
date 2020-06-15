const axios = require('axios');
const inquirer = require('inquirer')



// asking users questions //


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "userName",
    }
  ]);
}
// saved the function as a variable
user = promptUser();
user.then(function(user){
  getUserData(user.userName);

  let readme = ``
}).catch(function(err){
  console.log(err);
})
  

// getting information returned from github

function getUserData(userName) {
  axios
  .get(`https://api.github.com/users/${userName}/repos?per_page=100`)
  .then(function (response) {
    // handle success
    console.log(response);
    console.log("Retrieved user data")
    let user = response.data[0].owner.login;
    let picture = response.data[0].owner.avatar_url;
    
   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    console.log("There was an error retrieving user data")
  })
  .finally(function () {
    // always executed
  });
}



  