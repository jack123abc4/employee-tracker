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

async function addDepartment() {
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

async function addRole() {
    const departments = await db.promise().query("SELECT department_name FROM departments");
    let departmentChoices = [];
    for (const d of departments[0]) {
        departmentChoices.push(d.department_name);
    }
    // console.log(departmentChoices);
    const userResponse = await inquirer
        .prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary for this role? $"
        },
        {
            type: "list",
            name: "departmentName",
            message: "What department does this role belong to?",
            choices: departmentChoices
        }
    ]);
    // console.log("User response",userResponse);
    const departmentNum = (await db.promise().query(
                `SELECT id
                FROM departments
                WHERE
                department_name="${userResponse.departmentName}"`))[0][0].id;
    
    const sql = `
        INSERT INTO roles (title, salary, department_id)
            VALUES ("${userResponse.roleName}", ${userResponse.salary}, ${departmentNum})`;
    await db.promise().query(sql);

    getNextTask();
}

async function addEmployee() {
    const departments = (await db.promise().query("SELECT department_name FROM departments"))[0];
    let departmentChoices = [];
    for (const d of departments) {
        departmentChoices.push(d.department_name);
    }

    const roles = (await db.promise().query("SELECT id, title FROM roles"))[0];
    // console.log(roles);
    let roleChoices = [];
    for (const r of roles) {
        roleChoices.push(r.title);
    }

    const employees = (await db.promise().query("SELECT id, first_name, last_name FROM employees"))[0];
    // console.log(employees);
    let managerChoices = [];
    for (const m of employees) {
        managerChoices.push(`${m.first_name} ${m.last_name}`);
    }
    managerChoices.push("None");

    const userResponse = await inquirer
        .prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the last name of the new employee?"
        },
        {
            type: "list",
            name: "roleName",
            message: "What is the new employee's role?",
            choices: roleChoices
        },
        {
            type: "list",
            name: "managerName",
            message: "Who is the new employee's manager?",
            choices: managerChoices,
            default: "None"
        },
    ]);
    // console.log("User response",userResponse);
    const roleID = (await db.promise().query(
        `SELECT id
        FROM roles
        WHERE
        title="${userResponse.roleName}"`))[0][0].id;
    

    const managerID = userResponse.managerName === "None" ? null : (await db.promise().query(
        `SELECT id
        FROM employees
        WHERE CONCAT(first_name," ",last_name)="${userResponse.managerName}"`))[0][0].id;
    // console.log("managerID",managerID);
    

    const sql = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ("${userResponse.firstName}", "${userResponse.lastName}", ${roleID}, ${managerID})`;
    await db.promise().query(sql);
    getNextTask();

}

function getNextTask() {
    inquirer
        .prompt({
            type: "list",
            name: "nextTask",
            message: "What would you like to do next?",
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
                case "Add A Role":
                    addRole();
                    break;
                case "Add An Employee":
                    addEmployee();
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