//created objects of custom module
var dboperations= require('./dboperations');
//var order= require('./order')

// required for creating API
var express= require('express');
var bodyParser= require('body-parser');
var cors= require('cors');
var app=express();
var router= express.Router();

// required to configure the APP
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);

//middleware to perform authorization or loggin code
router.use((request,response,next)=> {
    console.log('middleware');
    next();
});

//endpoint in a URL that enables the API to gain access to resources on a server

//here  endpoint is used in API to get the data  of customers from database 
router.route('/customers').get((request,response)=>{
    var query = "select * from customer" ;
    dboperations.getData(response, query);
});

//endpoint in a URL that enables the API to gain access to resources on a server

//here  endpoint is used in API to get the data  of customers from database with its unique ID
router.route('/customers/:customerId').get((request,response)=>{
    var customerId = request.params.customerId;
    var query = "select * from customer where customer_id = '" + customerId + "'";
    dboperations.getData(response, query);
});

//endpoint in a URL that enables the API to gain access to resources on a server

//here  endpoint is used in API to delete the data  of customers from database with its unique ID
router.route('/customers/:customerId').delete((request,response)=>{
    var customerId = request.params.customerId;
    var tableName = "customer";
    dboperations.getData(response, customerId, tableName);
});

//endpoint in a URL that enables the API to gain access to resources on a server

//here  endpoint is used in API to post the data  of customers from database 
router.route('/customers/add').post((request,response)=>{
    var tableName = "customer";
    var params = req.body;
    dboperations.addData(response, params, tableName);
});

//endpoint in a URL that enables the API to gain access to resources on a server

//here  endpoint is used in API to get the data of pets from database 
router.route('/pets').get((request,response)=>{
    var query = "select * from pet" ;
    dboperations.getData(response, query);
});

//endpoint in a URL that enables the API to gain access to resources on a server

//here  endpoint is used in API to get the data of pets from database with its ID
router.route('/pets/:petId').get((request,response)=>{
    var petId = request.params.petId;
    var query = "select * from pet where pet_id = '" + petId + "'";
    dboperations.getData(response, query);
});


//listening at Particular port
var port= process.env.PORT || 8012;
app.listen(port);
console.log('Order API is running' +port);
