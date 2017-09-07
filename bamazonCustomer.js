var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	user:"root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;

	startCustomer();
});

// function displayProducts(){
// 	var choiceProducts = [];
// 		for (var i = 0; i < results.length; i++){
// 			var prod = results[i].item_id;
// 			prod += ") " + results[i].product_name;
// 		}
// 	return choiceProducts;
// };

function startCustomer(){
	connection.query("Select * FROM products", function (error, results){
		if (error) throw error;

		inquirer.prompt([{
			name: "productID",
			type: "list",
			message: "What's the ID of the product you would like to purchase?",
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
			message: "How many would you like to buy?"
		}]).then(function(answer){
			var id = parseInt(answer.productID.slice(0,answer.productID.indexOf(")")));
			var quantity = results[id-1].stock_quantity - parseInt(answer.amount);
			var total_cost = parseInt(answer.amount) * results[id-1].price;
			var total_sales = total_cost + results[id-1].product_sales;

			if (quantity >= 0){
				connection.query("UPDATE products SET ? WHERE ?",[
					{stock_quantity: quantity,product_sales: total_sales},
					{item_id: id}
				],function(err, result){
					if (err) throw err;
					console.log("Total cost is " + total_cost);
				});
			}else{
				console.log("Insufficient quantity!");
			}
		});
	});
}