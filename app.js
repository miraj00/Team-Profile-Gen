const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Employee = require("./lib/Employee");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const employees1 = [];
const employees = [];


const prompt1 = [             
 {
    type: 'text',
    name: 'name',
    message: 'What is team member name?',
 },
 {
    type: 'list',
    name: 'role',
    message: 'What is role of this team member?',
    choices : ['Manager', 'Engineer', 'Intern']    
 }, 
 {
    type: 'input',
    name: 'officeNumber',
    message: 'What is your office number',
    when: function( answers ) {
      // Only run if user answered Manager to the role prompt
      return answers.role === "Manager";
        },
 },
 {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username?',
    when: function( answers ) {
      // Only run if user answered Engineer to the role prompt
      return answers.role === "Engineer";
        },
 }, 
 {
    type: 'input',
    name: 'school',
    message: 'Which school do you go to?',
    when: function( answers ) {
      // Only run if user answered Intern to the role prompt
      return answers.role === "Intern";
        },
 },              
{
    type: 'input',
    name: 'email',
    message: 'Please Enter member E-mail address :',
},
{
    type: 'input',
    name: 'id',
    message: 'Please Enter ID of the team member :',
   },

]

inquirer.prompt(prompt1)
    .then((answers) => {
        console.log(answers);
  
        const answerArr1 = new Employee(answers.name, answers.role, answers.email, answers.id);
        employees1.push(answerArr1);
        console.log(employees1);
        

        if(answers.officeNumber){
        const answerArr2 = new Manager(answers.name, answers.role, answers.email, answers.id, answers.officeNumber);
        employees.push(answerArr2);
        console.log(employees);
        }
        //engineeer works 
        else if(answers.github){
        const answerArr3 = new Engineer(answers.name, answers.role, answers.email, answers.id, answers.github);
        employees.push(answerArr3);
        console.log(employees);
        }
        // Intern works
        else if (answers.school){
        const answerArr4 = new Intern(answers.name, answers.role, answers.email, answers.id, answers.school);
        employees.push(answerArr4);
        console.log(employees);
        }  

        fs.writeFile(outputPath, render(employees), function(error, results){
            if(error) console.log(error);
        })

    })




    // if (role ==== manager){
    //     let manager = new Manager(name, role, email, id, officeNumber)
    //   }



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!
//