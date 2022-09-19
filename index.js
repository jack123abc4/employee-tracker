const inquirer = require('inquirer');
const mysql = require('mysql2');\
const cTable = require('console.table');

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

