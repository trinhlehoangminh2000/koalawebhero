'use strict'
//import mysql driver
const mysql = require('mysql');

//export a function to open a connection to the database, we will need
//to always open a connection before we do any database operation or execute any query
//this function recieve the database access information and a callback function
//eventually the callback function will either be called with errors if any happened or
//be called and the connection object is passed to it with null for error 
const connect = function(conData, callback){
	let conn = mysql.createConnection({
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
          database: conData.database,
          port: conData.port
		});
    conn.connect(function(err) {
		if (err) callback(err);
		callback(null, conn);
	});
};

exports.connect = connect;

//export a function to create database tables
//this function suppose to create all our tables for us, we will need to call it only one time
//that is when we are setting up our final system, also note that this function should only be accessed 
//by the administrator of the website, so it is very credential, currently we do not have
//any protection over it
exports.createTables = function (conData, callback){
	let con = mysql.createConnection({
		  multipleStatements:true,
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
		  database: conData.database
		});
		let sql = "CREATE TABLE contacts (id INT NOT NULL AUTO_INCREMENT, forename VARCHAR(32), surname VARCHAR(32), email VARCHAR(32), subject VARCHAR(2048), message TEXT, dateRecieved DATETIME, PRIMARY KEY (id));";
		sql += "CREATE TABLE users (username VARCHAR(16) NOT NULL, password VARCHAR(16) NOT NULL, PRIMARY KEY (username));"
		sql += "CREATE TABLE employees (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(32), img TEXT NOT NULL, jobTitle VARCHAR(32), PRIMARY KEY (id));"
		sql += "CREATE TABLE products ( `id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(30) NOT NULL , `description` LONGTEXT NOT NULL , `price` DOUBLE NOT NULL , `img` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;"
		con.query(sql, function (err, result) {
			//console.log("finish query:" + result);
			callback(err, result);
		});
	};
	
//this function is to insert a new contact in the database
//export the function to make it accessible from other modules
exports.addContact = function (conData, newContact, callback){
    //connect to database
    //insert the new contact
	connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('INSERT INTO contacts SET ?', newContact, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
}

exports.login = function (connData, loginData, callback){
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		conn.query('SELECT password FROM users WHERE username = \'' + loginData.username +'\'' , function (err, result) {
			//return control to the calling module
			if (err){
				callback(err, null);
			}
			if (loginData.password == result[0]["password"]){
				callback(err,loginData.username);
			} else {
				callback(err, null);
			}

		});
	})
}

exports.addProduct = function (conData, newProduct, callback){
	//connect to the database
	connect(conData, function(err, conn){
		//if any error
		if (err) {
			console.log("error in connecting to db:" + err);
			callback(err);
			return;
		}
		//excecute the query
		conn.query('INSERT INTO products SET ?', newProduct, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
}
exports.updateProduct = function (conData, newProduct, callback){
	var updateProduct= newProduct;
	//connect to the database
	connect(conData, function(err, conn){
		//if any error
		if (err) {
			console.log("error in connecting to db:" + err);
			callback(err);
			return;
		}
		//excecute the query
		conn.query('UPDATE `products` SET `title` = \''+updateProduct.title+'\', `description` = \''+updateProduct.description+'\', `price` = \''+updateProduct.price+'\', `img` = \''+updateProduct.img+'\' WHERE `products`.`id` =\'' + updateProduct.id + '\'', newProduct, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
}
exports.getProduct = function (connData, id, callback){
	var i = id;
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		//perform the query
		conn.query('SELECT * FROM products WHERE id = \'' + i + '\'' , function (err, result) {
			if (result){
				console.log('got the result');
			} else {
				console.log('No result');
				ejs.renderFile('./html/index.ejs', data, null, function(err, str){
					// str => Rendered HTML string
					res.send(str);
				});
			}
			//return control to the calling module
			callback(err, result);
		});
	})
}
exports.delProduct = function (connData, id, callback){
	var i = id;
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		//perform the query
		conn.query('DELETE FROM `products` WHERE `products`.`id` = \'' + i + '\'' , function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	})
}
exports.getProductsNumber = function (connData, callback){
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		console.log("Connecting to db success: ")
		//perform the query
		conn.query('SELECT * FROM products' , function (err, result) {
			if(err){
				console.log(err)
			}
			else{
				console.log(result)
			}
			//return control to the calling module
			callback(err, result);
		});
	})
}

exports.getEmployeesNumber = function (connData, callback){
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		console.log("Connecting to db success: ")
		//perform the query
		conn.query('SELECT * FROM employees' , function (err, result) {
			if(err){
				console.log(err)
			}
			else{
				console.log(result)
			}
			//return control to the calling module
			callback(err, result);
		});
	})
}
exports.delEmployee = function (connData, id, callback){
	var i = id;
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		//perform the query
		conn.query('DELETE FROM `employees` WHERE `employees`.`id` = \'' + i + '\'' , function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	})
}
exports.addEmployee = function (conData, newEmployee, callback){
	//connect to the database
	connect(conData, function(err, conn){
		//if any error
		if (err) {
			console.log("error in connecting to db:" + err);
			callback(err);
			return;
		}
		//excecute the query
		conn.query('INSERT INTO employees SET ?', newEmployee, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
}

exports.getMessage = function (connData, id, callback){
	var i = id;
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		//perform the query
		conn.query('SELECT * FROM contacts WHERE id = \'' + i + '\'' , function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	})
}
exports.getMessageNumber = function (connData, callback){
	connect (connData, function (err, conn){
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}
		//perform the query
		conn.query('SELECT * FROM contacts' , function (err, result) {
			if (err){
				console.log(err);
			} else {
				console.log(result)
			}
			//return control to the calling module
			callback(err, result);
		});
	})
}



