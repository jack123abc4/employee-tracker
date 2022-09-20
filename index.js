const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { inherits } = require('util');
const { resolve } = require('path');

const db = mysql.createConnection(
    {
        // replace w/ .env later
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the company_db database')
);

async function printTable(sql)  {
    await db.promise().query(sql)
    .then((response) =>
        console.table(response[0])
    );
    getNextTask();
}

function printDepartments() { 
    printTable(
    `SELECT d.id AS DEPARTMENT_ID, d.department_name AS NAME
        FROM departments AS d`
    );
}

function printRoles() { 
    printTable(
    `SELECT r.id AS ROLE_ID, r.title AS TITLE, r.salary AS SALARY, d.department_name AS DEPARTMENT_NAME
        FROM roles AS r
        JOIN departments AS d ON r.department_id = d.id`
    );
}
function printEmployees() { 
    printTable(
    `SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title as TITLE, d.department_name AS DEPARTMENT_NAME, r.salary AS SALARY, IFNULL(CONCAT(m.first_name, ' ', m.last_name), "N/A") AS MANAGER
        FROM employees AS e
        JOIN roles AS r ON e.role_id = r.id
        JOIN departments AS d ON r.department_id = d.id
        LEFT JOIN employees AS m ON e.manager_id = m.id`
    );
}

async function addDepartment(response) {
    await inquirer
        .prompt({
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?"
        })
        .then((response) => {
            const sql = `
            INSERT INTO departments (department_name)
                VALUES ("${response.departmentName}")`;
            db.query(sql);
        })
    getNextTask();
}

function getNextTask() {
    inquirer
        .prompt({
            type: 'list',
            name: "nextTask",
            message: 'What would you like to do next?',
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role"
            ]
        })
        .then((response) => {
            switch(response.nextTask) {
                case "View All Departments":
                    printDepartments();
                    break;
                case "View All Roles":
                    printRoles();
                    break;
                case "View All Employees":
                    printEmployees();
                    break;
                case "Add A Department":
                    addDepartment();
                    break;
                default:
                    console.log("Haven't coded that part yet.");
                    getNextTask();
                    break;
            }
        }); 
}

function init() {
    getNextTask();
}

init();


// printDepartments(); // view all departments
// printRoles(); // view all roles
// printEmployees(); // view all employees