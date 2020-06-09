
CREATE DATABASE IF NOT EXISTS employee_db;

USE employee_db;

CREATE TABLE employee (
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER
,PRIMARY KEY (id)

);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES("Derrick", "Chargois", 23, 25);

DROP TABLE employee;

