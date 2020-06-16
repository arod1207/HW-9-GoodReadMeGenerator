const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

let picture;

// asking users questions //

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub username?: ",
      name: "userName",
    },
    {
      type: "input",
      message: "What is your repository name?: ",
      name: "repoName",
    },
    {
      type: "input",
      message: "Project Title: ",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "Project Description: ",
      name: "projectDesc",
    },
    {
      type: "checkbox",
      message: "Table of Contents Options: ",
      name: "tableOfCont",
      choices: [
        {
          name: "Installation",
        },
        {
          name: "Usage",
        },
        {
          name: "Credits",
        },
        {
          name: "License",
        },
      ],
    },
    {
      type: "input",
      message: "Installation: ",
      name: "install",
    },
    {
      type: "input",
      message: "Usage: ",
      name: "usage",
    },
    {
      type: "list",
      message: "License: ",
      choices: ["Apache", "BSD", "GNU", "MIT"],
      name: "license",
    },
    {
      type: "input",
      message: "Contributing: ",
      name: "contributing",
    },
    {
      type: "input",
      message: "Test: ",
      name: "test",
    },
    {
      type: "list",
      message: "Would you like to add your picture?: ",
      choices: ["Yes", "No"],
      name: "userPic",
      filter: function (val) {
        return val.toLowerCase();
      },
    },
    {
      type: "list",
      message: "Would you like to add your email address?: ",
      choices: ["Yes", "No"],
      name: "userEmail",
      filter: function (val) {
        return val.toLowerCase();
      },
    },
  ]);
}

// saved the function as a variable
user = promptUser();

user.then(function (user) {
  getUserData(user.userName);

  function getUserData(userName) {
    axios
      .get(`https://api.github.com/users/${userName}/repos?per_page=100`)
      .then(function (response) {
        // handle success
        console.log(response); // comment out at the end
        console.log("Retrieved user data");

        // User confirm if image is added or not //

        picture = response.data[0].owner.avatar_url;

        if (user.userPic === "yes") {
          user.userPic = `![Users GitHub Profile Image](${picture})`;
          console.log(user.userPic);
        } else if (user.userPic === "no") {
          user.userPic = " ";
        }

      // if statments for selected table of contents
        
        if (user.tableOfCont[0] === undefined) {
          user.tableOfCont[0] = " "
        } else {
          user.tableOfCont[0] = `* ${user.tableOfCont[0]}`
        }

        if (user.tableOfCont[1] === undefined) {
          user.tableOfCont[1] = " "
        } else {
          user.tableOfCont[1] = `* ${user.tableOfCont[1]}`
        }

        if (user.tableOfCont[2] === undefined) {
          user.tableOfCont[2] = " "
        } else {
          user.tableOfCont[2] = `* ${user.tableOfCont[2]}`
        }

        if (user.tableOfCont[3] === undefined) {
          user.tableOfCont[3] = " "
        } else {
          user.tableOfCont[3] = `* ${user.tableOfCont[3]}`
        }


       

        // beginning of readme markdown //
        let readme = `
  
        ${user.userPic}     
  # ${user.projectTitle}   

  ## ${user.projectDesc}
  
  ${user.tableOfCont[0]}
  ${user.tableOfCont[1]}
  ${user.tableOfCont[2]}
  ${user.tableOfCont[3]}
  
  ### ${user.install}
  
  ### ${user.usage}
  
  ### ${user.license}
  
  ![Top Language](https://img.shields.io/github/languages/top/${userName}/${user.repoName}) ![GitHub last commit](https://img.shields.io/github/last-commit/${userName}/${user.repoName})  ![GitHub Followers](https://img.shields.io/github/followers/${userName}?style=social)
  
  Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
  
  
  ### ${user.contributing}
  
  
  ### ${user.test}
  


  
  `;

        // end of generated Readme.md

        // create readme file

        fs.writeFile("README.md", readme, function (err) {
          if (err) throw err;
          console.log("README.md Created");
        });
      })
      .catch(function (err) {
        console.log(err);
      })

      .catch(function (error) {
        // handle error
        console.log(error);
        console.log("There was an error retrieving user data");
      })
      .finally(function () {
        // always executed
      });
  }
});
