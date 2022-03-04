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
//to add the data in particular table
  async function addData(res, params, tableName) {   
    pool.getConnection((err, connection) => {
        connection.query('INSERT INTO '+tableName+' SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool

        if (!err) {
            res.status(200).json(" with the record ID  has been added.");
        } else {
            res.status(400).json(err);
        }
        console.log('The data from  table are: \n', rows)
    })
});

}
//For Deleting the data from table with specific id
async function DeleteData(res, id, tableName) {   
 
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM '+tableName+' WHERE id = ?', [id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.status(200).send('Deleted!');
            } else {
                res.status(400).json(err);
            }
            
            console.log('The data from  table are: \n', rows)
        })
    });

}
// exporting the modules
  module.exports={
    getData:getData,
    //getOrder:getOrder
  }
