INSERT INTO departments (department_name)
VALUES
    ("Marketing"),
    ("Engineering"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Head of marketing", 160000.00,1),
    ("Research analayst", 80000.00,1),
    ("Copywriter", 50000.00,1),
    ("Senior engineer", 85000.00,2),
    ("Junior engineer", 60000.00,2),
    ("Chief of legal strategies", 210000.00,3),
    ("Lawyer", 150000.00,3),
    ("Paralegal", 55000.00,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
    ("Jobe", "Leonard", 1, null),
    ("Lucas", "Ventura", 2, 1),
    ("Samantha", "Saunders", 2, 1),
    ("Zaina", "Glenn", 3, 1),
    ("Katya", "Haynes", 3, 1),
    ("Erik", "Byrne", 4, null),
    ("Daniel", "Mccullough", 5, 6),
    ("Pawel", "Duffy", 5, 6),
    ("Lindsay", "Hess", 5, 6),
    ("Hoorain", "Peralta", 6, null),
    ("Ayana", "Singleton", 7, 10),
    ("Zakir", "Wood", 7, 10),
    ("Gracie-Mae", "Cross", 8, 11),
    ("Hanifa", "Shaffer", 8, 12);