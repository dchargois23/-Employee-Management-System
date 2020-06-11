//added the dependicies
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');
//const Headerfile = require("./Headerfile")


//establishing connection to mysql
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
//connecting to mysql
connection.connect(function (err) {
    if (err) throw err;
    startProg();
});


//initializing the inquirer function
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
        })//creating switch cases that will will respond to each choice selected in the "choices" menu
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
//creating department that will ask fro user input, then take the input input and insert to table "department"
function createDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Which deparment would you like to add?"



        })//take response and using the INSERT function to add a column to mysql table
        .then(function (answer) {
            console.table(answer);
            //adding departmnt column
            var query = ` INSERT INTO department (name)
            VALUES ("${answer.department}")
            `;
            //query mysql to add department column
            connection.query(query, answer.department, function (err, res) {
                if (err) throw err;

            });
            console.table(answer.department);
        });

}
//take response and using the INSERT function to add a column to mysql table
function createRole() {
    inquirer
        .prompt({
            name: "role",
            type: "input",
            message: "What employee role would you like to add?",


        })//take response and using the INSERT function to add a column to mysql table
        .then(function (answer) {
            console.log(answer);

            var query = ` INSERT INTO role (title)
            VALUES ("${answer.role}")
            `;//query mysql to add role column
            connection.query(query, answer.role, function (err, res) {
                if (err) throw err;

            });


            inquirer //prompining the user to etablish a salary for this role
                .prompt({

                    name: "salary",
                    type: "input",
                    message: "What is the annual salary for this role?"


                })
                .then(function (answer) {
                    console.log(answer);
                    //adding salary for the role
                    var query = ` INSERT INTO role (salary)
            VALUES("${answer.salary}")
            `;
                    connection.query(query, answer.role, function (err, res) {
                        if (err) throw err;

                    });
                });

        });



}
//getting new employee input from user
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
                name: "empsalary",
                type: "input",
                message: "What is the employee's salary?"

            },
            {
                name: "empdepartment",
                type: "input",
                message: "Who is the employee's manager?"


            })
        //taking user inout 
        .then(function (answer) {
            console.table(answer);
            //insert employee in to table
            var query = ` INSERT INTO employee.first_name, employee.last_name, role.title, role.salary, department.name
            VALUES ("${answer.empfirstname}")("${answer.epmlastname}")("${answer.emprole}")("${answer.empsalary}")("${answer.empdepartment}")
            `;
            //query mysql to add department column
            connection.query(query, function (err, res) {
                if (err) throw err;

            });

        });



}
//creating function that will allow the user to select a department to view employees
function viewDepartment() {

    var deptQuery = "SELECT * FROM department";
    connection.query(deptQuery, function (err, res) {
        if (err) throw err;
        console.log(res);
        //create an var that will map all repsonse returns the ansers lsted under name
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


            })//after department option is selected, we will take the input and select the empoyee from that particular department id
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

//create a funtion to select role from table
function viewRole() {

    var roleQuery = "SELECT * FROM role";
    connection.query(roleQuery, function (err, res) {
        if (err) throw err;
        console.log(res);

        var roleOpt = res.map(roleObj => {

            return roleObj.title;

        })
        console.log(roleOpt);

        inquirer
            .prompt({
                name: "role",
                type: "list",
                message: "Please select a role",
                choices: roleOpt


            })
            .then(function (answer) {
                var query = ` SELECT employee.first_name, employee.last_name, role.title
                From employee
                INNER JOIN department ON employee.department_id = role.role_id
                WHERE role.title = '${answer.role}'
                `;


                connection.query(query, function (err, resRole) {
                    if (err) throw err;
                    console.log(resRole);


                });

            });

    });


}


function viewEmployee() {

    var empQuery = "SELECT * FROM employee";
    connection.query(empQuery, function (err, res) {
        if (err) throw err;
        console.log(res);

        var empOpt = res.map(empObj => {

            return empObj;

        })
        console.log(empOpt);

        inquirer
            .prompt({
                name: "employee",
                type: "list",
                message: "View employees by role?",
                choices: empOpt


            })
            .then(function (answer) {
                var query = ` SELECT employee.first_name, employee.last_name, role.title
                From employee
                INNER JOIN department ON employee.department_id = .role_id
                WHERE role.title = '${answer.employee}'
                `;


                connection.query(query, function (err, resRole) {
                    if (err) throw err;
                    console.log(resEmp);


                });

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
            choices: []
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