SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id;