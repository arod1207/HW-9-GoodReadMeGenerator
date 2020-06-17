const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
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
      message: "What is your email address?: ",
      name: "userEmail",
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
      choices: ["Apache", "BSD", "GNU", "MIT", "NONE"],
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
      name: "confirmEmail",
      filter: function (val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    // call github api //
    axios
      .get(`https://api.github.com/users/${answers.userName}`)
      .then(function (response) {
        // handle success
        // console.log(response);
        console.log(answers.license)

        let picture = response.data.avatar_url;

        if (answers.confirmEmail === "yes") {
          answers.userEmail = `#### ${answers.userEmail}`;
        } else if (answers.confirmEmail === "no") {
          answers.userEmail = " ";
        }

       else if (answers.license === "NONE") {
          answers.license = " ";
        } else {
          answers.license = `### ${answers.license}`;
        }

        // if statements for licesne selection
        if (answers.license === "Apache"){
          answers.license = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
        } else if (answers.license === "BSD") {
          answers.license = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
        } else if (answers.license === "GNU"){
          answers.license = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
        } else if (answers.license === "MIT") {
          answers.license = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
        } else if (answers.license === "NONE") {
          answers.license = " ";
        } else {
          answers.license = `### ${answers.license}`;
        }

        // if statement for user pic

        if (answers.userPic === "yes") {
          answers.userPic = `![Users GitHub Profile Image](${picture})`;
        } else if (answers.userPic === "no") {
          answers.userPic = " ";
        }

        // if statements for selected table of contents

        if (answers.tableOfCont[0] === undefined) {
          answers.tableOfCont[0] = " ";
        } else {
          answers.tableOfCont[0] = `* ${answers.tableOfCont[0]}`;
        }

        if (answers.tableOfCont[1] === undefined) {
          answers.tableOfCont[1] = " ";
        } else {
          answers.tableOfCont[1] = `* ${answers.tableOfCont[1]}`;
        }

        if (answers.tableOfCont[2] === undefined) {
          answers.tableOfCont[2] = " ";
        } else {
          answers.tableOfCont[2] = `* ${answers.tableOfCont[2]}`;
        }

        if (answers.tableOfCont[3] === undefined) {
          answers.tableOfCont[3] = " ";
        } else {
          answers.tableOfCont[3] = `* ${answers.tableOfCont[3]}`;
        }
//  Start of ReadME markdown //
        let readme = `

# ${answers.projectTitle}   
    
## ${answers.projectDesc}
      
${answers.tableOfCont[0]}
${answers.tableOfCont[1]}
${answers.tableOfCont[2]}
${answers.tableOfCont[3]}
      
### ${answers.install}
      
### ${answers.usage}
      
${answers.license}
      
![Top Language](https://img.shields.io/github/languages/top/${answers.userName}/${answers.repoName}) ![GitHub last commit](https://img.shields.io/github/last-commit/${answers.userName}/${answers.repoName})  ![GitHub Followers](https://img.shields.io/github/followers/${answers.userName}?style=social)
        
### ${answers.contributing}
      
      
### ${answers.test}
      
${answers.userPic}   

${answers.userEmail}
    
      `;
// end of readme markup //

        fs.writeFile("README.md", readme, (err) => {
          if (err) throw err;
          console.log("README file created");
        });
      });
  })
  .catch(function (error) {
    console.log(error);
  });

// end of promise //
