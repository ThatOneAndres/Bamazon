var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
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


function addInventory(){
    connection.query("SELECT * FROM products", function(err, results){
        if (err) throw err;
        inquirer.prompt([{
            name: "productChoice",
            type: "list",
            message: "Choose product to increase inventory:",
            choices: function(){
				var choiceProducts = [];
				for (var i = 0; i < results.length; i++){
					var prod = results[i].item_id;
					prod += ") " + results[i].product_name;
					choiceProducts.push(prod);
				}
                return choiceProducts;
            }
        },{
            name: "amount",
            message: "Amount of inventory to add:"
        }]).then(function(answer){
            var id = parseInt(answer.productChoice.slice(0,answer.productChoice.indexOf(")")));
            var quantity = results[id-1].stock_quantity + parseInt(answer.amount);
            connection.query("UPDATE products SET ? WHERE ?",[
				{stock_quantity: quantity},
				{item_id: id}
			],function(err, result){
				if (err) throw err;
				console.log("New quantity is " + quantity);
			});
        });
    });
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
        // var sql_search = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES " +
        //                 "('" + connection.escape(answer.nameProduct) + "','" +
        //                 connection.escape(answer.departmentProduct) + "','" +
        //                 connection.escape(answer.priceProduct) + "','" +
        //                 connection.escape(answer.quantityProduct) + "')";  
        // connection.query(sql_search,function(err, result){
        //     if (err) throw err;
        //     console.log(result);
        // });
        connection.query({
            sql: "INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES (?,?,?,?,?)",
            values: [answer.nameProduct, answer.departmentProduct, answer.priceProduct, answer.quantityProduct, 0]
        }, function(err, result){
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
            addInventory();
        }else{
            addProduct();
        }
    });
}