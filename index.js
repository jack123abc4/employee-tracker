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

function printTable(sql)  {
    db.query(sql, (err, result) => {
        if (err) {
          result.status(400).json({ error: err.message });
          return;
        }
        console.table(result);
        return result;
    });
}

let printDepartments = printTable(
    `SELECT d.id AS DEPARTMENT_ID, d.department_name AS NAME
    FROM departments AS d`
    );
let printRoles = printTable(
    `SELECT r.id AS ROLE_ID, r.title AS TITLE, r.salary AS SALARY, d.department_name AS DEPARTMENT_NAME
    FROM roles AS r
    JOIN departments AS d ON r.department_id = d.id`
);
let printEmployees = printTable(
    `SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title as TITLE, d.department_name AS DEPARTMENT_NAME, r.salary AS SALARY, IFNULL(CONCAT(m.first_name, ' ', m.last_name), "none") AS MANAGER
    FROM employees AS e
    JOIN roles AS r ON e.role_id = r.id
    JOIN departments AS d ON r.department_id = d.id
    LEFT JOIN employees AS m ON e.manager_id = m.id`
);

function getNextTask() {

}

function init() {
    printDepartments; // view all departments
    printRoles; // view all roles
    printEmployees; // view all employees

    getNextTask();
}

init();