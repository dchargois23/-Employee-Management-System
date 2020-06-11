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

            SELECT employee.first_name, employee.last_name, role.title, role.salary
            From employee
                INNER JOIN role ON employee.role_id = role.role_id;
            INSERT INTO department
                (name)
            VALUES
                ("Sales"),
                ("Engineering"),
                ("Legal"),
                ("Finance");

            INSERT INTO employee
                (first_name,last_name,role_id,department_id)
            VALUES
                ("John", "Doe", 1, 4),
                ("Mike", "Chan", 2, 3),
                ("Tom", "Allen", 3, 2),
                ("Malia", "Brown", 4, 1),
                ("Ashley", "Rodriguez", 1, 4);

            INSERT INTO role
                (role_id,title,salary,department_id)
            ;
            VALUES
            (