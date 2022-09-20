-- SELECT * FROM departments;
-- SELECT * FROM roles;
-- SELECT * FROM employees;

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
SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title as TITLE, d.department_name AS DEPARTMENT_NAME, r.salary AS SALARY, IFNULL(CONCAT(m.first_name, ' ', m.last_name), "N/A") AS MANAGER
    FROM employees AS e
    JOIN roles AS r ON e.role_id = r.id
    JOIN departments AS d ON r.department_id = d.id
    LEFT JOIN employees AS m ON e.manager_id = m.id;

-- ADD DEPARTMENT
-- INSERT INTO departments (department_name)
--     VALUES ("Janitorial");

-- GET EMPLOYEE ID BY FIRST AND LAST NAME
-- SELECT id
    -- FROM employees
    -- WHERE CONCAT(first_name," ",last_name)="Jobe Leonard";

-- EMPLOYEES PRINT OUT ORDERED
-- SELECT e.id AS EMPLOYEE_ID, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title as TITLE, d.department_name AS DEPARTMENT_NAME, r.salary AS SALARY, IFNULL(CONCAT(m.first_name, ' ', m.last_name), null) AS MANAGER
--     FROM employees AS e
--     JOIN roles AS r ON e.role_id = r.id
--     JOIN departments AS d ON r.department_id = d.id
--     LEFT JOIN employees AS m ON e.manager_id = m.id
--     ORDER BY MANAGER;

-- DELETE DEPARTMENT
-- DELETE FROM departments 
--     WHERE department_name="shuffleboarding";