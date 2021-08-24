const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = require("./lib/Employee");
inquirer.registerPrompt("recursive", require("inquirer-recursive"));

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees1 = [];
const employees = [];

const prompt1 = [
  {
    type: "confirm",
    name: "repeat",
    message: "Do you want to add employee ?",
  },
];

const prompt2 = [
  {
    type: "text",
    name: "name",
    message: "What is team member name?",
    validate: nameText => {
      if(nameText){
          return true;
      } else {
          console.log('Please Enter Team Member Name');
          return false;
      }
  }
  },
  {
    type: "list",
    name: "role",
    message: "What is role of this team member?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number",
    when: function (answers) {
      // Only run if user answered Manager to the role prompt
      return answers.role === "Manager";
    },
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
    when: function (answers) {
      // Only run if user answered Engineer to the role prompt
      return answers.role === "Engineer";
    },
  },
  {
    type: "input",
    name: "school",
    message: "Which school do you go to?",
    when: function (answers) {
      // Only run if user answered Intern to the role prompt
      return answers.role === "Intern";
    },
  },
  {
    type: "input",
    name: "email",
    message: "Please Enter member E-mail address :",
    validate: emailText => {
      if(emailText){
          return true;
      } else {
          console.log('Please Enter email of the member, if no Email type "NA"');
          return false;
      }
  }
  },
  {
    type: "input",
    name: "id",
    message: "Please Enter ID of the team member :",
    validate: (idInput) => {
      // to make sure its a Number and no letters
      if (isNaN(idInput)) {
        console.log("Please Type ID Number (No letters allowed)");
        return false;
      } 
      else {
        return true;
      }
    },

  },
];

var firstPrompt = () => {
  inquirer.prompt(prompt1).then((answer) => {
 //   console.log(answer);
    if (answer.repeat === true) {
      secondPrompt();
      } 
      else {
       console.log("Please check  output folder's team.html for generated HTML file") 
      fs.writeFile(outputPath, render(employees), function(error, results){
        if(error) console.log(error);
       })
         
    }
  });
};

firstPrompt();

var secondPrompt = () => {
  inquirer.prompt(prompt2).then((answers) => {
//    console.log(answers);

    const answerArr1 = new Employee(
      answers.name,
      answers.role,
      answers.email,
      answers.id
    );
    employees1.push(answerArr1);
//    console.log(employees1);

    if (answers.officeNumber) {
      const answerArr2 = new Manager(
        answers.name,
        answers.role,
        answers.email,
        answers.id,
        answers.officeNumber
      );
      employees.push(answerArr2);
//    console.log(employees);
      firstPrompt();    }
    //engineeer works
    else if (answers.github) {
      const answerArr3 = new Engineer(
        answers.name,
        answers.role,
        answers.email,
        answers.id,
        answers.github
      );
      employees.push(answerArr3);
//    console.log(employees);
      firstPrompt();
    }
    // Intern works
    else if (answers.school) {
      const answerArr4 = new Intern(
        answers.name,
        answers.role,
        answers.email,
        answers.id,
        answers.school
      );
      employees.push(answerArr4);
//    console.log(employees);
      firstPrompt();
    }
  });
};
