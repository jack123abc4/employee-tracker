-- SELECT * FROM departments;
-- SELECT * FROM roles;
-- SELECT * FROM employees;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
-- FROM employees
-- LEFT JOIN roles ON employees.role_id = roles.id;

-- SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS TITLE, r.salary AS SALARY
-- FROM employees AS e
-- LEFT JOIN roles AS r ON e.role_id = r.id;





-- DEPARTMENT PRINT OUT
SELECT d.id AS DEPARTMENT_ID, d.department_name AS NAME
FROM departments AS d;

-- ROLES PRINT OUT
-- job title, role id, department that role belongs to, salary for that role
SELECT r.id AS ROLE_ID, r.title AS TITLE, r.salary AS SALARY, d.department_name AS DEPARTMENT_NAME
FROM roles AS r
JOIN departments AS d ON r.department_id = d.id;


-- EMPLOYEES PRINT OUT
-- employee id, first name, last name, job title, department, salary, manager
SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title as TITLE, d.department_name AS DEPARTMENT_NAME, r.salary AS SALARY, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER
FROM employees AS e
JOIN roles AS r ON e.role_id = r.id
JOIN departments AS d ON r.department_id = d.id
INNER JOIN employees AS m ON e.manager_id = m.id;

