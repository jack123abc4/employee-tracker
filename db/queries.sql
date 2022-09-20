SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
-- FROM employees
-- LEFT JOIN roles ON employees.role_id = roles.id;

SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS TITLE, r.salary AS SALARY
FROM employees AS e
LEFT JOIN roles AS r ON e.role_id = r.id;