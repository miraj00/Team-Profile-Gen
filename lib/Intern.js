// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.


const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, school) {

        super(name);
        
        this.school = school;
      
        inquirer 
        .prompt({
         type: 'text',
         name: 'school',
         message: 'Which school do you go to?'
        })
        
       .then(({ school }) => {
           this.school = new Intern(school);
       })

    }
}
module.exports = Intern;