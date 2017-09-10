# Bamazon 
## Requirements
* Will need to have a sql sever up
* use npm install to get needed node modules from package.json
* For each script ensure that server port matches to your machine. Found at the top of every script is this: 
```javascript
var connection = mysql.createConnection({
  host: "localhost",
	user:"root",
	password: "root",
	database: "bamazon"
});
```
You can add port value to object if default does not match your system.
## How to use Bamazon
Before starting take a look at bamazonProducts.sql and run the script in sql to create necessary database and tables for this project.
There are three files to run depending on who you are.
### Customer
1. Run script in terminal/bash by typing ``` node bamazonCustomer.js ```
2. You will be asked to choose which product you will like to purchase. You will use keyboard keys up arrow and down to move between selections. Select Running Shoes and press enter.
3. After the product selection you will be asked how many you would like to buy. Press 5 and enter.
###  Manager
1. Run script in terminal/bash by typing ``` node bamazonManager.js ```
2. You will have four options to select
    * View Products for Sale
        1. You will see list of all products for sale.
    * View Low Inventory
        1. All products whose quantity is less than 5 will be shown.
    * Add to Inventory
        1. You will be asked to choose a product to increase its inventory. Select Sandals
        2. You will be asked the amount of inventory to add. Enter 20
    * Add New Product
        1. You will be asked to enter name of new product. Enter Test.
        2. You will be asked to enter department of product. Enter Home.
        3. You will be asked to enter price of product. Enter 9.99
        4. You will be asked to enter how many are available. Enter 101.
### Supervisor
1. Run script in terminal/bask by typing ``` node bamazonSupervisor.js ```
2. You will have two options to select
    * View Product Sales by Departments
        1. You will be shown a table with all departments, their over head costs, their product sales and profits.
    * Create New Department
        1. You will be asked what is the name of the new department. Enter Testing
        2. You will be asked for over head costs. Enter 5000.
