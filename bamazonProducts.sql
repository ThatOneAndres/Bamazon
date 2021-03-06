USE bamazon;

CREATE TABLE products(
	item_id INTEGER(11) auto_increment NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INTEGER(11),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;


INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES	("Fire TV Stick", "Television and Video", 34.99,78);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Flash Drive",
						"Electronics",
                        24.99,
                        50);

INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Game of Thrones Season 7",
						"Movies & TV",
                        119.99,
                        4);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Sandal",
						"Clothing, Shoes & Jewlery",
                        39.99,
                        500);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Running Shoes",
						"Clothing, Shoes & Jewlery",
                        79.95,
                        500);
                        
INSERT INTO products (product_name,
                        price,
                        stock_quantity)
			VALUES	("Wallet",
                        29.99,
                        200);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Keyboard",
						"Electronics",
                        37.99,
                        100);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Cell Phone Case",
						"Cell Phones & Accessories",
                        14.99,
                        999);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Video Game",
						"Video Games",
                        59.99,
                        500);
                        
INSERT INTO products (product_name,
						department_name,
                        price,
                        stock_quantity)
			VALUES	("Trimmer",
						"Beauty & Personal Care",
                        43.99,
                        250);
                        

CREATE TABLE departments(
	department_id INTEGER(11) auto_increment NOT NULL,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name,
                        over_head_costs)
			VALUES	("Beauty & Personal Care",
                        3000);
                        
INSERT INTO departments (department_name,
                        over_head_costs)
			VALUES	("Video Games",
                        2500);
                        
INSERT INTO departments (department_name,
                        over_head_costs)
			VALUES	("Cell Phones & Accessories",
                        1000);

INSERT INTO departments (department_name,
                        over_head_costs)
			VALUES	("Electronics",
                        5000);
                        
INSERT INTO departments (department_name,
                        over_head_costs)
			VALUES	("Clothing, Shoes & Jewlery",
                        9000);
                        
INSERT INTO departments (department_name,
                        over_head_costs)
			VALUES	("Movies & TV",
                        5000);


SELECT * FROM departments;

ALTER TABLE products 
ADD product_sales INTEGER(11);

UPDATE products SET product_sales = 0;

UPDATE products SET product_sales = 20000 WHERE item_id = 1;

UPDATE products SET product_sales = 20000 WHERE item_id = 2;