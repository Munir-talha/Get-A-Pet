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

//middleware to perform authorization or loggin
router.use((request,response,next)=> {
    console.log('middleware');
    next();
});

