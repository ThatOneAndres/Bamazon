var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	user:"root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;

	startManager();
});

function viewProduct(){
    connection.query("SELECT * FROM products",function(err, results){
        if (err) throw err;
        console.log("ID\t Product\t Price\t Quantity\r\n")
        for (let i = 0; i < results.length; i++){
            console.log(results[i].item_id + "\t " +
                        results[i].product_name + "\t $" +
                        results[i].price + "\t " +
                        results[i].stock_quantity);
        }
    });
};

function viewLowerInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",function(err, results){
        if (err) throw err;
        for (let i = 0; i < results.length; i++){
            console.log(results[i].product_name);
        }
    });
};


function addInvetory(){

};

function addProduct(){
    inquirer.prompt([{
        name: "nameProduct",
        message: "What is the name of the new product?",
    },{
        name: "departmentProduct",
        message: "What department is this product from?"
    },{
        name: "priceProduct",
        message: "What is the price of the product?"
    },{
        name: "quantityProduct",
        message: "How many will be available?"
    }]).then(function(answer){
        var sql_search = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES " +
                        "('" + answer.nameProduct + "','" +
                        answer.departmentProduct + "','" +
                        answer.priceProduct + "','" +
                        answer.quantityProduct + "')";  
        console.log(sql_search);
        connection.query(sql_search,function(err, result){
            if (err) throw err;
            console.log(result);
        });
    });
};



function startManager(){
    inquirer.prompt({
        name: "menuOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory","Add to Inventory","Add New Product"]
    }).then(function(answer){
        var choice = answer.menuOptions;
        if (choice === "View Products for Sale"){
            viewProduct();
        }else if (choice === "View Low Inventory"){
            viewLowerInventory();
        }else if (choice === "Add to Inventory"){
            addInvetory();
        }else{
            addProduct();
        }
    });
}