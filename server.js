const db = require("./db/connection");
var inquirer = require("inquirer");
const cTable = require("console.table");

function promptMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuOptions",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then((data) => {
      switch (data.menuOptions) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        // case "View All Employees":
        //     viewEmployees();
        //     break;
        // case "Add Department":
        //     addDepartment();
        //     break;
        // case "Add Role":
        //     addRole();
        //     break;
        // case "Add Employee":
        //     addEmployee();
        //     break;
        // case "Update Employee Role":
        //     udpateEmployee();
        //     break;
        default:
          process.exit();
      }
    });
}

function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, results) => {
    console.table(results);
    promptMenu();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM role;`, (err, results) => {
    console.table(results);
    promptMenu;
  });
}

// function viewEmployees() {
//     const sql = `SELECT * FROM employee`;

//     db.query(sql)
// }

promptMenu();
