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
      message: "Project Title: ",
      name: "projectTitle",
    },
    {
      type: "input",
      message: "Project Description: ",
      name: "projectDesc",
    },
    {
      type: "input",
      message: "Table of Contents: ",
      name: "tableOfCont",
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
        // console.log(response); // comment out at the end
        console.log("Retrieved user data");

        picture = response.data[0].owner.avatar_url;

        if (user.userPic === "yes") {
          user.userPic = `![Users GitHub Profile Image](${picture})`
          console.log(user.userPic);
        } else if (user.userPic === "no") {
           user.userPic = " "
        }

        let readme = `# ${user.projectTitle}

  ## ${user.projectDesc}
  
  ## ${user.tableOfCont}
  
  * ${user.install}
  * ${user.usage}
  * ${user.license}
  * ${user.contributing}
  
  
  ## ${user.install}
  
  
  ## ${user.usage}
  
  
  ## ${user.license}
  
  
  🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.
  
  ## Badges
  
  ![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)
  
  Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.
  
  
  ## ${user.contributing}
  
  If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.
  
  ## ${user.test}
  
  Go the extra mile and write tests for your application. Then provide examples on how to run them.

  ${user.userPic}
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
