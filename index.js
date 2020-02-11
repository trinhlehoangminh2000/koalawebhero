///import express module
var express = require('express');
var parser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var path = require('path');
var db = require('./database');


//create an express app
var app = express();
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));
app.use(parser.json());
app.use(parser.urlencoded());
app.use(express.static('public'));


//prepare our database connection parameters


const databaseData = { 
    host:"remotemysql.com",
    user:"PWvADhWahT",
    password: "CUVKk0Sah5",
    database: "PWvADhWahT",
    port: 3306
};

// const databaseData = { 
//     host:"localhost",
//     user:"root",
//     password: "",
//     database: "koala",
//     port: 3306
// };
//add a callback function to handle 
//get request on the root
app.get('/', function(req, res) {  
    let data = {
        title: "Koala"
    }
    ejs.renderFile('./html/index.ejs', data, null, function(err, str){
        // str => Rendered HTML string
        res.send(str);
    });
});


app.get('/about', function(req, res) {
    db.getEmployeesNumber(databaseData,function(err,result){
        if(err){
        }
        else{
            var list = [];
            for (var key in result) {
                if (result.hasOwnProperty(key)) {           
                    list.push({name: result[key].name, jobTitle:result[key].jobTitle, pathToImg:result[key].img});
                }
            }
            let data = {
                title: "About Koala ",
                employees: list,
            }
            ejs.renderFile('./html/about.ejs', data, null, function(err, str){
                // str => Rendered HTML string
                res.send(str);
            });
        }
    });
});
app.post('/handleEmployee', function(req, res){
    console.log(req.body);
    //validate the data
    //forename is required
    if(req.body.name === undefined){
        res.status = 400;
        res.send({message:"name is required"});
        return;
    }//forename must be at least 2 characters long
    else if(req.body.name.length < 2){
        res.status = 400;
        res.send({message:"name is too short"});
        return;
    }
    
    //job is required
    if(req.body.jobTitle === undefined){
        res.status = 400;
        res.send({message:"job title is required"});
        return;
    }
    if(req.body.img === undefined){
        res.status = 400;
        res.send({message:"image is required"});
        return;
    }
    
    //data validation is correct 
    //connect to database and save the data
    //we need to created an object with fields that matches database fields
    //otherwise we get errors
    const newEmployee =  {
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        img: req.body.img,
    }
    //we are atempting to add a new contact
    //call the addConact function
    db.addEmployee(databaseData, newEmployee, function (err, data){
        //our response will be a json data
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        //when adding a user is done, this code will run
        //if we got an error informs the client and set the proper response code
        if(err){
            res.status(400);
            res.end("error:" + err);
            return;
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        res.end(JSON.stringify({message:"Employee added"}));
    });
   
})
app.get('/employee_add', function(req, res) {
    if(req.session.user){
        let data = {
            title: "Admin Panel"
        }
        ejs.renderFile('./html/employee_add.ejs', data, null, function(err, str){
            // str => Rendered HTML string
            res.send(str);
        });
    }
    else{
        res.redirect('/login')
    }
});
app.get('/employee_list', function (req, res){
    if(req.session.user){
        db.getEmployeesNumber(databaseData,function(err,result){
            if(err){
            }
            else{
                var list = [];
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {           
                        var de = '/del_employee?id='+result[key].id;
                        list.push({id:result[key].id, name: result[key].name, jobTitle:result[key].jobTitle,del:de});
                    }
                }
                let data = {
                    title: "Managing Employees",
                    employees: list,
                }
                ejs.renderFile('./html/employee_list.ejs', data, null, function(err, str){
                    // str => Rendered HTML string
                    res.send(str);
                });
            }
        });
    }
    else{
        res.redirect('/login')
    }
});
app.get('/del_employee', function(req, res){
    if(req.session.user){
        let id = req.query.id;
        db.delEmployee(databaseData, id, function(err, result){
            if(err){
                console.log(err);
            } else {
                res.redirect('/employee_list');
            }
        });
    }
    else{
        res.redirect('/login')
    }
});

app.get('/contact', function(req, res) {
//    res.sendFile(path.join(__dirname+'/html/contact.html'));
    let data = {
        title: "Contact us"
    }
    ejs.renderFile('./html/contact.ejs', data, null, function(err, str){
        // str => Rendered HTML string
        res.send(str);
    });
});
app.get('/contact_list', function (req, res){
    if(req.session.user){
        db.getMessageNumber(databaseData,function(err,result){
            if(err){
            }
            else{
                var list = [];
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {           
                        list.push({id:result[key].id, forename: result[key].forename, surname:result[key].surname,subject:result[key].subject,dateRecieved:result[key].dateRecieved,email:result[key].email});
                    }
                }
                let data = {
                    title: "Contact View",
                    products: list,
                }
                ejs.renderFile('./html/contact_list.ejs', data, null, function(err, str){
                    // str => Rendered HTML string
                    res.send(str);
                });
            }
        });
    }
    else{
        res.redirect('/login')
    }
});
app.get('/contact_view', function(req, res) {
    if(req.session.user){
        let id = req.query.id;
        db.getMessage(databaseData, id, function(err, result){
            if(err){
                console.log(err);
            } else {
                console.log(result[0].surname);
                let data = {
                    title: "Messages",
                    forename: result[0].forename,
                    email: result[0].email,
                    surname: result[0].surname,
                    subject: result[0].subject,
                    dateRecieved: result[0].dateRecieved,
                    message: result[0].message
                }
                ejs.renderFile('./html/contact_view.ejs', data, null, function(err, str){
                    // str => Rendered HTML string
                    res.send(str);
                });
            }
        });
    }else{
        res.redirect('/login')
    }
});
app.post('/handlecontact', function(req, res){
    console.log(req.body);
    //validate the data
    //forename is required
    if(req.body.forename === undefined){
        res.status = 400;
        res.send({message:"forename is required"});
        return;
    }//forename must be at least 2 characters long
    else if(req.body.forename.length < 2){
        res.status = 400;
        res.send({message:"forename is too short"});
        return;
    }
    //surname is required
    if(req.body.surname === undefined){
        res.status = 400;
        res.send({message:"surname is required"});
        return;
    }
    //email is required
    if(req.body.email === undefined){
        res.status = 400;
        res.send({message:"email is required"});
        return;
    }//email should be at least 5 characters long
    else if(req.body.email.length < 5 ){
        res.status = 400;
        res.send({message:"email is too short"});
        return;
    }
    else {
        //email must match a specific pattern for a valid email
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(req.body.email).toLowerCase())){
            res.status = 400;
            res.send({message:"invalid email format"});
            return;
        }
    }
    
    //data validation is correct 
    //connect to database and save the data

    //we need to created an object with fields that matches database fields
    //otherwise we get errors
    const newContact =  {
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        dateRecieved: new Date()
    }
    //we are atempting to add a new contact
    //call the addConact function
    db.addContact(databaseData, newContact, function (err, data){
        
        //our response will be a json data
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        //when adding a user is done, this code will run
        //if we got an error informs the client and set the proper response code
        if(err){
            res.status(400);
            res.end("error:" + err);
            return;
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        res.end(JSON.stringify({message:"we recieved your message"}));
    });
   
})

app.get('/product', function(req, res) {
    db.getProductsNumber(databaseData,function(err,result){
        if(err){
            console.log("Error at getting Products number");
            ejs.renderFile('./html/index.ejs', data, null, function(err, str){
                // str => Rendered HTML string
                res.send(str);
            });
        }
        else{
            var list = [];
            for (var key in result) {
                if (result.hasOwnProperty(key)) {           
                    list.push({id:result[key].id, title: result[key].title, description:result[key].description,pathToImg:result[key].img});
                }
            }
            let data = {
                title: "Product",
                products: list,
                
            }
            ejs.renderFile('./html/product.ejs', data, null, function(err, str){
                // str => Rendered HTML string
                res.send(str);
            });
        }
    });

});
app.get('/product_add', function(req, res) {
    if(req.session.user){
        let data = {
            title: "Admin Panel"
        }
        ejs.renderFile('./html/product_add.ejs', data, null, function(err, str){
            // str => Rendered HTML string
            res.send(str);
        });
    }
    else{
        res.redirect('/login')
    }
});
app.get('/product_view', function(req, res) {
    let id = req.query.id;
    db.getProduct(databaseData, id, function(err, result){
        if(err){
            console.log(err);
        } else {
            let data = {
                title: "Product",
                name: result[0].title,
                price: result[0].price,
                img: result[0].img,
                description: result[0].description,
            }
            ejs.renderFile('./html/product_view.ejs', data, null, function(err, str){
                // str => Rendered HTML string
                res.send(str);
            });
        }
    });
});
app.get('/product_list', function (req, res){
    if(req.session.user){
        db.getProductsNumber(databaseData,function(err,result){
            if(err){
            }
            else{
                var list = [];
                for (var key in result) {
                    if (result.hasOwnProperty(key)) {           
                        var de = '/del_product?id='+result[key].id;
                        var up = '/up_product?id='+result[key].id;
                        list.push({id:result[key].id, title: result[key].title, description:result[key].description,price:result[key].price,del:de,update:up});
                    }
                }
                let data = {
                    title: "Managin Products",
                    products: list,
                }
                ejs.renderFile('./html/product_list.ejs', data, null, function(err, str){
                    // str => Rendered HTML string
                    res.send(str);
                });
            }
        });
    }
    else{
        res.redirect('/login')
    }
});
app.get('/del_product', function(req, res){
    if(req.session.user){
        let id = req.query.id;
        db.delProduct(databaseData, id, function(err, result){
            if(err){
                console.log(err);
            } else {
                res.redirect('/product_list');
            }
        });
    }
    else{
        res.redirect('/login')
    }
});
app.get('/up_product', function(req,res){
    if(req.session.user){
        let id = req.query.id;
        db.getProduct(databaseData, id, function(err, result){
        if(err){
            console.log(err);
        } else {
            let data = {
                title: "Product Update",
                id: result[0].id,
                name: result[0].title,
                price: result[0].price,
                img: result[0].img,
                description: result[0].description,
            }
            ejs.renderFile('./html/product_update.ejs', data, null, function(err, str){
                // str => Rendered HTML string
                res.send(str);
            });
        }
    });
    }
    else{
        res.redirect('/login')
    }
});
app.post('/handleproduct', function(req, res){
    console.log(req.body);
    //validate the data
    //forename is required
    if(req.body.title === undefined){
        res.status = 400;
        res.send({message:"product title is required"});
        return;
    }//forename must be at least 2 characters long
    else if(req.body.title.length < 2){
        res.status = 400;
        res.send({message:"title is too short"});
        return;
    }
    //price is required
    if(req.body.price === undefined){
        res.status = 400;
        res.send({message:"price is required"});
        return;
    }//price must be at least 0
    else if(req.body.title < 0){
        res.status = 400;
        res.send({message:"price must be at least 0"});
        return;
    }
    //description is required
    if(req.body.description === undefined){
        res.status = 400;
        res.send({message:"description is required"});
        return;
    }
    
    //data validation is correct 
    //connect to database and save the data
    //we need to created an object with fields that matches database fields
    //otherwise we get errors
    const newProduct =  {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
    }
    //we are atempting to add a new contact
    //call the addConact function
    db.addProduct(databaseData, newProduct, function (err, data){
        //our response will be a json data
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        //when adding a user is done, this code will run
        //if we got an error informs the client and set the proper response code
        if(err){
            res.status(400);
            res.end("error:" + err);
            return;
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        res.end(JSON.stringify({message:"Product created"}));
    });
   
})
app.post('/handleproductupdate', function(req, res){
    console.log(req.body);
    //validate the data
    //forename is required
    if(req.body.title === undefined){
        res.status = 400;
        res.send({message:"product title is required"});
        return;
    }//forename must be at least 2 characters long
    else if(req.body.title.length < 2){
        res.status = 400;
        res.send({message:"title is too short"});
        return;
    }
    //price is required
    if(req.body.price === undefined){
        res.status = 400;
        res.send({message:"price is required"});
        return;
    }//price must be at least 0
    else if(req.body.title < 0){
        res.status = 400;
        res.send({message:"price must be at least 0"});
        return;
    }
    //description is required
    if(req.body.description === undefined){
        res.status = 400;
        res.send({message:"description is required"});
        return;
    }
    
    //data validation is correct 
    //connect to database and save the data
    //we need to created an object with fields that matches database fields
    //otherwise we get errors
    const newProduct =  {
        id : req.body.id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
    }
    //we are atempting to add a new contact
    //call the addConact function
    db.updateProduct(databaseData, newProduct, function (err, data){
        //our response will be a json data
        res.setHeader('content-type', 'application/json')
        res.setHeader('accepts', 'GET, POST')
        //when adding a user is done, this code will run
        //if we got an error informs the client and set the proper response code
        if(err){
            res.status(400);
            res.end("error:" + err);
            return;
        }
        //if no error let's set proper response code and have a party
        res.status(201);
        res.end(JSON.stringify({message:"Product updated"}));
    });
   
})

app.get('/admin', function (req, res){
    if(req.session.user){
        let data = {
            title: "Admin Panel",
        }
        ejs.renderFile('./html/admin.ejs', data, null, function(err, str){
            // str => Rendered HTML string
            res.send(str);
        });      
    }else{
        res.redirect('/login')
    }
});
app.get('/login', function (req,res){
    let data = {
        title: "Login"
    }
    ejs.renderFile('./html/login.ejs', data, null, function(err, str){
        // str => Rendered HTML string
        res.send(str);
    });
});
app.post('/authenticate', function(req, res){
    console.log(req.body)
    let loginData = {
        username : req.body.username,
        password : req.body.password
    }
    db.login(databaseData, loginData, function(err, data){
        if(err){
        }
        else{
            if(data && data.length > 0){
                req.session.user = data;
                //you loged in 
                //you can go to home page
                res.redirect('/admin');
            }
            else
            {
                res.redirect('/login')
            }
        }
    })
});
app.get('/logout', function (req,res){
    req.session.user = undefined;
    res.send("you logged out successfully");
});



//this to create the tables insiode our db
//remeber this should be password protected
app.get('/createDB', function(req, res) {  
    //run the create table function
    db.createTables(databaseData, function(err, result){
        //if amy error happend send an error response
        if(err) {
            res.status(400);
            res.end("an error has occured:" + err);
            return;
        }
        //otherwise we created tables successfully
        res.status(200);
        res.end("tables were created successfully");
    });
});





//run the server on port 3000
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server running on port:" + port);
});
