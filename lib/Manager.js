// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, officeNumber) {

        super(name);
        
        this.officeNumber = officeNumber;

        inquirer 
        .prompt({
         type: 'text',
         name: 'officeNumber',
         message: 'What is your office number?'
        })
        
       .then(({ officeNumber }) => {
           this.officeNumber = new Manager(officeNumber);
       })
    }
}
module.exports = Manager;