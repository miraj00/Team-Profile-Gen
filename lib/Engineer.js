// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, github) {

        super(name);
        
        this.github = github;

        inquirer 
          .prompt({
           type: 'text',
           name: 'github',
           message: 'What is your GitHub username?'
          })
          
         .then(({ github }) => {
             this.github = new Engineer(github);
         }
         
         )
    }
}
module.exports = Engineer;