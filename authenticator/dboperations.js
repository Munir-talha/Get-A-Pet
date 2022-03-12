var config=require('./dbconfig');
//object to use sql 
const sql = require('mysql');
//for creating sql connection
const pool  = sql.createPool(config);

//used Assyncronous because by default it works in synchronous manner
async function getData(res, query) {
    //created the connection
    pool.getConnection((err, connection) => {
        //After connecting with database designed the query
        connection.query(query, (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.status(200).json(rows);
            } else {
                res.status(400).json(err);
            }
            console.log('The data from  table are: \n', rows)
        })
    });
  }
