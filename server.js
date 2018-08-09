var express = require('express')
var app = express()
var MDB = require('monetdb')();
var bodyParser = require('body-parser')
 
var options = {
    host     : '127.0.0.1', 
    port     : 50000, 
    dbname   : 'demo', 
    user     : 'monetdb', 
    password : 'monetdb'
};


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
     //console.log(req);
     console.log("Got a POST request for the homepage");

     var conn = new MDB(options);
     conn.connect();
     
     conn.query('SELECT city, sum(salary) FROM employee group by city',true).then(function(result) {
         // Do something with the result
         console.log('result.data',result.data);
         res.send(result.data);
     });
     
     conn.close();
 
  //res.send('Hello World')
})

app.post('/getdata', function (req, res) {
    //console.log(req);
    console.log("Got a POST request for the homepage");

    var conn = new MDB(options);
    conn.connect();
    
    console.log(req.body.equery);

    conn.query(req.body.equery,true).then(function(result) {
        // Do something with the result
        console.log('result.data',result.data);
        res.send(result.data);
    });
    
    conn.close();

    //res.send({test:"hellp getdata method"});
 })


//  app.get('/getTables', function (req, res) {
//     //console.log(req);
//     console.log("Got a POST request for getTables");

//     var conn = new MDB(options);
//     conn.connect();
    
//     conn.query('select tables.name from tables where tables.system=false',true).then(function(result) {
//         // Do something with the result
//         console.log('result.data',result.data);
//         res.send(result.data);
//     });
    
//     conn.close();

// })
 
app.listen(4000)