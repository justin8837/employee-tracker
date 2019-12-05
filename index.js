let mysql = require("mysql");
let inquirer = require("inquirer");
let table = require("console.table");
let dotenv = require("dotenv");

dotenv.config();

let PORT = process.env.PORT || 3306;

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.user,
  password: process.env.password,
  database: "schema_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  init();
  console.log("Connected on " + connection.threadId);
});

function init() {
  inquirer
    .prompt([
      {
        name: "employeeChoices",
        message: "What would you like to do?",
        type: "list",
        choices: [
          "View all employees",
          "View all employees by manager",
          "View all employees by departments",
          "View combined salary of the department",
          "Add employee",
          "Add departments",
          "Add roles",
          "Remove employee",
          "Update employee roles",
          "Update employee manager"
        ]
      }
    ])
    .then(function(input) {
      if (input.employeeChoices == "View all employees") {
        connection.query("SELECT * FROM employees", function(err, res) {
          console.log(res);
          return init();
        });
      }
      if (input.employeeChoices == "View all employees by manager") {
        connection.query("SELECT * FROM roles WHERE name = 'manager'", function(
          err,
          res
        ) {
          console.log(res);
          let roleId = res[0].id;
          connection.query(
            "SELECT * FROM employee WHERE roles_id=" + roleId,
            function(err, res) {
              inquirer
                .prompt([
                  {
                    name: "employeeManager",
                    type: "list",
                    choices: res
                  }
                ])
                .then(function(showManager) {
                  let byManager =
                    res[roles.indexOf(showManager.employeeManager)].id;
                  connection.query(
                    "SELECT * FROM employees WHERE manager_id =" + byManager,
                    function(err, res) {
                      console.log(res);
                      return init();
                    }
                  );
                });
            }
          );
        });
      }
      if (input.employeeChoices == "View all employees by departments") {
        inquirer
          .prompt([{ name: "employeeDepartment", type: "list", choices: [] }])
          .then(function(showDepartment) {
            let byDepartment =
              res[roles.indexOf(showDepartment.employeeDepartment)].id;
            connection.query("SELECT * FROM roles where department_id = input");
            return init();
          });
      }
      if (input.employeeChoices == "View combined salary of the department") {
      }
      if (input.employeeChoices == "Add employee") {
        connection.query("SELECT * FROM roles", function(err, res) {
          console.log(res);
          let roles = [];
          res.forEach(function(role) {
            roles.push(role.name);
          });
          inquirer
            .prompt([
              {
                name: "firstName",
                message: "Enter employee's first name",
                type: "input"
              },
              {
                name: "lastName",
                message: "Enter employee's last name",
                type: "input"
              },
              {
                name: "employeeRole",
                message: "Enter the employee's role",
                type: "list",
                choices: roles
              },
              {
                name: "employeeManager",
                message: "Who is the employee's manager?",
                type: "list",
                choices: ["None"]
              }
            ])
            .then(function(employeeInput) {
              var fName = employeeInput.firstName;
              var lName = employeeInput.lastName;
              var role = res[roles.indexOf(employeeInput.employeeRole)].id;
              var manager = employeeInput.employeeManager;
              console.log(employeeInput);
              connection.query(
                "INSERT INTO employees (first_name,last_name,roles_id,manager_id) VALUES (?,?,?,?)",
                [fName, lName, role, manager],
                function(err, res, fields) {
                  console.log(err);
                  console.log(res);
                  return init();
                }
              );
            });
        });
      }
      if (input.employeeChoices == "Add departments") {
        inquirer
          .prompt([
            {
              name: "addDepartment",
              type: "input",
              message: "Enter the name of the department you wish to add."
            }
          ])
          .then(function(departmentInput) {
            let dInput = departmentInput.addDepartment;
            connection.query("INSERT INTO department (name) VALUES (?)", [
              dInput
            ]);
            return init();
          });
      }

      if (input.employeeChoices == "Add roles") {
        inquirer
          .prompt([
            {
              name: "addRole",
              type: "input",
              message: "Enter new roles that you wish to add."
            }
          ])
          .then(function(insertRole) {
            let rInput = insertRole.addRole;
            connection.query("INSERT INTO roles (name) VALUES (?)", [rInput]);
            return init();
          });
      }
      if (input.employeeChoices == "Remove employee") {
        connection.query("DELETE FROM employee WHERE id = employee", function(
          err,
          res,
          fields
        ) {
          inquirer.prompt([
            {
              name: "deleteEmployee",
              type: "list",
              message: "Which employee would you like to delete?",
              choices: "SELECT * FROM employees"
            }
          ]);
          return init();
        });
      }
      if (input.employeeChoices == "Update employee roles") {
        inquirer
          .prompt([
            {
              name: "updateRole",
              type: "input",
              message: "To which role would you like to update this as?"
            }
          ])
          .then(function(update) {
            let upRole = update.updateRole;
            connection.query(
              "UPDATE employee WHERE employee = role_id VALUES updateRole",
              [upRole]
            );
            return init();
          });
      }
      if (input.employeeChoices == "Update employee manager") {
        inquirer
          .prompt([
            {
              name: "updateEmployee",
              type: "input",
              message: "Which employee would you like to update?"
            }
          ])
          .then(function(upEmployee) {
            let uEmployee = upEmployee.updateEmployee;
            connection.query("UPDATE employee WHERE employee");
          });
      }
    });
}
