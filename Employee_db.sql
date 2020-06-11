CREATE DATABASE
IF NOT EXISTS  employee_db;

USE employee_db;

CREATE TABLE employee
(
    employee_id INT NOT NULL
    AUTO_INCREMENT,
first_name VARCHAR
    (30) NOT NULL,
last_name VARCHAR
    (30) NOT NULL,
role_id INTEGER NOT NULL,
department_id INTEGER NOT NULL,
FOREIGN KEY
    (role_id) REFERENCES role
    (role_id),
FOREIGN KEY
    (department_id) REFERENCES department
    (department_id),
PRIMARY KEY
    (employee_id)
);

    SELECT *
    FROM employee;

    CREATE TABLE role
    (
        role_id INT NOT NULL
        AUTO_INCREMENT,
title VARCHAR
        (30) NOT NULL,
salary DECIMAL
        (10,2) NOT NULL,
department_id INTEGER NOT NULL,
FOREIGN KEY
        (department_id) REFERENCES department
        (department_id),
PRIMARY KEY
        (role_id)
);

        SELECT *
        FROM role;

        CREATE TABLE department
        (
            department_id INTEGER NOT NULL
            AUTO_INCREMENT,
name VARCHAR
            (30) NOT NULL,
PRIMARY KEY
            (department_id)
);

            SELECT *
            FROM department;

            SELECT employee.first_name, employee, last_name, role.title, role.salary, department.name
            From employee
                INNER JOIN role ON employee.role_id = department.id
            WHERE department.id = 1