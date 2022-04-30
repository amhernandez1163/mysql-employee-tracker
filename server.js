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
        case "View All Employees":
          viewEmployees();
          break;
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
  db.query(
    `SELECT role.*, department.name
    AS department_id
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;`,
    (err, results) => {
      console.table(results);
      promptMenu();
    }
  );
}

function viewEmployees() {
  db.query(
    `SELECT E.id, 
    E.first_name, 
    E.last_name,
    R.title, 
    D.name AS department, 
    R.salary, 
    CONCAT(M.first_name,' ',M.last_name) AS manager 
    FROM employee E 
    JOIN role R ON E.role_id = R.id 
    JOIN department D ON R.department_id = D.id 
    LEFT JOIN employee M ON E.manager_id = M.id;`,
    (err, results) => {
      console.table(results);
      promptMenu();
    }
  );
}

promptMenu();
