
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
//const headerfile = require("Headerfile")
console.table({})

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "0504",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startProg();
});

function startProg() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View department",
                "View role",
                "View all employees",
                "Update employee role",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add department":
                    createDepartment();
                    break;

                case "Add role":
                    createRole();
                    break;

                case "Add employee":
                    createEmployee();
                    break;

                case "View department":
                    viewDepartment();
                    break;

                case "View role":
                    viewRole();
                    break;

                case "View all employees":
                    viewEmployee();
                    break;

                case "Update employee role":
                    updateRole();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function createDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Which deparment would you like to add?"



        })
        .then(function (answer) {
            console.log(answer);

            var query = ` INSERT INTO department (name)
            VALUES ("${answer.department}")
            `;

            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;

            });
        });

}

function createRole() {
    inquirer
        .prompt({
            name: "role",
            type: "input",
            message: "What employee title would you like to add?",


        })
        .then(function (answer) {
            console.log(answer);

            var query = ` INSERT INTO role (title)
            VALUES ("${answer.role}")
            `;
            connection.query(query, answer.role, function (err, res) {
                if (err) throw err;

            });


            inquirer
                .prompt({

                    name: "salary",
                    type: "input",
                    message: "What is the annual salary for this role?"


                })
                .then(function (answer) {
                    console.log(answer);

                    var query = ` INSERT INTO role (salary)
            VALUES("${answer.salary}")
            `;
                    connection.query(query, answer.role, function (err, res) {
                        if (err) throw err;

                    });
                });

        });



}

function createEmployee() {
    inquirer
        .prompt({

            name: "empfirstname",
            type: "input",
            message: "What is the employee's first name?"

        },
            {
                name: "epmlastname",
                type: "input",
                message: "What is the employee's last name?"

            },
            {
                name: "emprole",
                type: "input",
                message: "What is the employee's role"

            },
            {
                name: "empmanager",
                type: "input",
                message: "Who is the employee's manager?"

            })

        .then(function (answer) {
            var query = ` SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
            From employee
            INNER JOIN role ON employee.role_id = department.id
            WHERE department.id = 2
            `;
            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].first_name, res[i].last_name, res[i].title, res[i].salary, res[i].salary, res[i].name);
                }

                // Call updateProduct AFTER the INSERT complet
                createEmployee();
            });
        });

}

function viewDepartment() {

    var deptQuery = "SELECT * FROM department";
    connection.query(deptQuery, function (err, res) {
        if (err) throw err;
        console.log(res);

        var deptOpt = res.map(departmentObj => {

            return departmentObj.name;

        })
        console.log(deptOpt);

        inquirer
            .prompt({
                name: "department",
                type: "list",
                message: "View employees by department?",
                choices: deptOpt


            })
            .then(function (answer) {
                var query = ` SELECT employee.first_name, employee.last_name, department.name
                From employee
                INNER JOIN department ON employee.department_id = department.department_id
                WHERE department.name = '${answer.department}'
                `;


                connection.query(query, function (err, resDept) {
                    if (err) throw err;
                    console.log(resDept);


                });

            });




    });


}


function viewRole() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Which role would you like to view?",
            choices: [
                "Sales",
                "Engineering",
                "Legal",
                "Finance"
            ]
        })
        .then(function (answer) {
            var query = ` SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
                From employee
                INNER JOIN role ON employee.role_id = department.id
                WHERE department.id = 2
                `;
            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].first_name, res[i].last_name, res[i].title, res[i].salary, res[i].salary, res[i].name);

                }

                viewRole();

            });


        });


}

function viewEmployee() {
    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Which employee would you like to view?",
            choices: [
                "Sales",
                "Engineering",
                "Legal",
                "Finance"
            ]
        })
        .then(function (answer) {
            var query = ` SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
                From employee
                INNER JOIN role ON employee.role_id = department.id
                WHERE department.id = 2
                `;
            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].first_name, res[i].last_name, res[i].title, res[i].salary, res[i].salary, res[i].name);

                }

                viewEmployee();

            });


        });


}
function updateRole() {

    var empQuery = 'SELECT * FROM employee'

    connection.query(empQuery, function (err, res) {
        if (err) throw err;
        console.log(res)


        var empArray = res.map(item => {
            return `${item.first_name} ${item.last_name}`;


        })

        console.log(empArray);




    });


    inquirer
        .prompt({
            name: "department",
            type: "list",
            message: "Which employe would you like to update?",
            choices: [

            ]
        })
        .then(function (answer) {
            var query = ` SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name
                From employee
                INNER JOIN role ON employee.role_id = department.id
                WHERE department.id = 2
                `;
            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                    console.log(res[i].first_name, res[i].last_name, res[i].title, res[i].salary, res[i].salary, res[i].name);

                }

                updateRole();

            });


        });


}

































// function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function (err, res) {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].artist);
//         }
//         runSearch();
//     });
// }

// function rangeSearch() {
//     inquirer
//         .prompt([
//             {
//                 name: "start",
//                 type: "input",
//                 message: "Enter starting position: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             },
//             {
//                 name: "end",
//                 type: "input",
//                 message: "Enter ending position: ",
//                 validate: function (value) {
//                     if (isNaN(value) === false) {
//                         return true;
//                     }
//                     return false;
//                 }
//             }
//         ])
//         .then(function (answer) {
//             var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//             connection.query(query, [answer.start, answer.end], function (err, res) {
//                 if (err) throw err;
//                 for (var i = 0; i < res.length; i++) {
//                     console.log(
//                         "Position: " +
//                         res[i].position +
//                         " || Song: " +
//                         res[i].song +
//                         " || Artist: " +
//                         res[i].artist +
//                         " || Year: " +
//                         res[i].year
//                     );
//                 }
//                 runSearch();
//             });
//         });
// }

// function songSearch() {
//     inquirer
//         .prompt({
//             name: "song",
//             type: "input",
//             message: "What song would you like to look for?"
//         })
//         .then(function (answer) {
//             console.log(answer.song);
//             connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function (err, res) {
//                 if (err) throw err;
//                 console.log(
//                     "Position: " +
//                     res[0].position +
//                     " || Song: " +
//                     res[0].song +
//                     " || Artist: " +
//                     res[0].artist +
//                     " || Year: " +
//                     res[0].year
//                 );
//                 runSearch();
//             });
//         });
// }