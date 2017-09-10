var Table = require('cli-table');

var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
	user:"root",
	password: "root",
	database: "bamazon"
});
 

startSupervisor();

function startSupervisor(){
    inquirer.prompt({
        name: "menuOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }).then(function(answer){
        var choice = answer.menuOptions;
        if (choice === "View Product Sales by Department"){
            viewProductSales();
        }else{
            addNewDepartment();
        }
    });
}


function viewProductSales(){
    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM departments INNER JOIN products ON departments.department_name = products.department_name ORDER BY department_id",
    function(err,results){
        if (err) throw err;
        // instantiate 

        // var table = new Table({
        //     head: ['department_id', 'department_name',"over_head_costs","product_sales","total_profit"]
        // , colWidths: [50, 100]
        // });
        var table = new Table({
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                   , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                   , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                   , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
          });

        table.push(['department_id', 'department_name',"over_head_costs","product_sales","total_profit"]);
        for (var i = 0; i < results.length; i++){
            var result = results[i];
            var row = [];
            var profit = result.product_sales - result.over_head_costs;
            if (profit < 0){
                profit = 0;
            }
            row.push(result.department_id);
            row.push(result.department_name);
            row.push(result.over_head_costs);
            row.push(result.product_sales);
            row.push(profit);
            table.push(row);
        }

        console.log(table.toString());
    });
};

function addNewDepartment(){

};

