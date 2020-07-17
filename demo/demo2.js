var express = require('express');
var app = express();
var fs = require("fs");
const bodyParser = require('body-parser');
const mysql = require('mysql')

var server = app.listen(9000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

const options = {
   host: 'localhost',
   user: 'root',
   password: 'l0rdipraiseu',
   database: 'demo'
}

const connection = mysql.createConnection(options)

connection.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
   res.header("content-type", "application/json");
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");   
  next();
});


app.get('/students', function (req, res) {   
   connection.query("SELECT * FROM  student", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
});

app.get('/students/:studentID', function (req, res) {
   connection.query("SELECT * FROM student where studentID = " + req.params.studentID, function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})

app.post('/students', function (req, res) {
    connection.query("INSERT INTO `demo`.`student` (`first_name`, `last_name`, `email`) VALUES ('"+req.body.first_name+"', '"+req.body.last_name+"', '"+req.body.email+"'); ", function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
})


app.put('/students/:studentID', function (req, res) {
    console.log ("put");
    console.log(req.body);
  //connection.query("UPDATE student set first_name=?, last_name=?, email=? where studentID=?", [req.body.first_name,req.body.last_name, req.body.email, req.params.studentID], function (err, result, fields) {    
  connection.query("UPDATE `student` set first_name = '"+req.body.first_name+"', last_name ='"+req.body.last_name+"', email='"+req.body.email+"' where studentID = " +req.params.studentID, function (error, result, fields) {
          if (error) throw error;
	  res.end(JSON.stringify(result));
	});
})

app.delete('/students/:studentID', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM student WHERE studentID = ' + req.params.studentID, function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



//------

app.get('/courses', function (req, res) {   
   connection.query("SELECT * FROM  course", function (err, result, fields) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
})

app.put('/courses/:courseID', function (req, res) {
    console.log ("put");
    console.log(req.body);
   connection.query("UPDATE course set courseName = '"+req.body.courseName+"' where courseID = " +req.params.courseID, function (err, result, fields) {
          if (err) throw err;
	  res.end(JSON.stringify(result));
	});
})

