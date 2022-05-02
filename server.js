// dependencies required for app to run
const db = require("./db/connection");
var inquirer = require("inquirer");
const cTable = require("console.table");
const res = require("express/lib/response");

// upon entering Node server.js - the following options prompt
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
          "Add an Employee",
          "Update an Employee Role",
          "Exit",
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
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployee();
          break;
        default:
          process.exit();
      }
    });
}

// runs when user selects View All Departments
function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(results);
    promptMenu();
  });
}

// runs when user selects View All Roles
function viewRoles() {
  db.query(
    `SELECT role.*, department.name
    AS department_id
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
      promptMenu();
    }
  );
}

// runs when user selects View All Employees
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
      if (err) {
        console.log(err);
        return;
      }
      console.table(results);
      promptMenu();
    }
  );
}

// runs when user selects Add a Department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "Enter the name of the department you'd like to add:",
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name)
            VALUES (?)`,
        [data.addDept],
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("This department has been added.");
          promptMenu();
        }
      );
    });
}

function addRole() {
  db.query(`SELECT * FROM department;`, (err, results) => {
    let deptArr = [];
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      deptArr.push({ name: results[i].name, value: results[i].id });
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "Enter the title of this role:",
        },
        {
          type: "input",
          name: "roleSalary",
          message:
            "Enter the salary of this role (numbers only - no commas or dollar signs):",
        },
        {
          type: "list",
          name: "roleDept",
          message: "Select the department this role belongs to:",
          choices: deptArr,
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) 
          VALUES (?,?,?);`,
          [data.roleTitle, data.roleSalary, data.roleDept],
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("This role has been added successfully.");
            promptMenu();
          }
        );
      });
  });
}

// prompts when user selects Add an Employee
function addEmployee() {
  db.query(`SELECT * FROM role;`, (err, results) => {
    let roleArr = [];
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      roleArr.push({ name: results[i].title, value: results[i].id });
    }
    db.query(`SELECT * FROM employee`, (err, results) => {
      let employeeArr = [];
      if (err) {
        console.log(err);
      }
      for (let i = 0; i < results.length; i++) {
        employeeArr.push({
          name: results[i].first_name + " " + results[i].last_name,
          value: results[i].id,
        });
      }

      inquirer
        .prompt([
          {
            type: "input",
            name: "addFirstName",
            message: "Enter the new employees first name:",
          },
          {
            type: "input",
            name: "addLastName",
            message: "Enter the new employees last name:",
          },
          {
            type: "list",
            name: "newRole",
            message: "Select the role this employee belongs to:",
            choices: roleArr,
          },
          {
            type: "list",
            name: "newEManager",
            message: "Who is this employees manager?",
            choices: employeeArr,
          },
        ])
        .then((data) => {
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES (?,?,?,?);`,
            [
              data.addFirstName,
              data.addLastName,
              data.newRole,
              data.newEManager,
            ],
            (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
            }
          );
          console.log("This employee has been added successfully.");
          promptMenu();
        });
    });
  });
}

// runs when user slects Update an Employee Role
function updateEmployee() {
  db.query(`SELECT * FROM role;`, (err, results) => {
    let availRolesArr = [];
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      availRolesArr.push({ name: results[i].title, value: results[i].id });
    }

    db.query(`SELECT * FROM employee;`, (err, results) => {
      let availEmployeeArr = [];
      if (err) {
        console.log(err);
      }
      for (let i = 0; i < results.length; i++) {
        availEmployeeArr.push({
          name: results[i].first_name + " " + results[i].last_name,
          value: results[i].role_id,
        });
      }

      console.log(availRolesArr);
      console.log(availEmployeeArr);

      inquirer
        .prompt([
          {
            type: "list",
            name: "updatedEmployee",
            message: "Select the employee you with to update:",
            choices: availEmployeeArr,
          },
          {
            type: "list",
            name: "updatedRole",
            message: "Select the employee's new role:",
            choices: availRolesArr,
          },
        ])
        .then((data) => {
          db.query(
            `UPDATE employee SET role_id = ?
                  WHERE id = ?;`,
            [data.updatedRole, data.updatedEmployee],
            (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log("This employee has been updated successfully.");
              promptMenu();
            }
          );
        });
    });
  });
}

// Makes the menu run for user - tied to line 8
promptMenu();
