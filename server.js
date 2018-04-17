const db = require('./models/todo.js');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Todo = require('./models/todo');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app-demo');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
	res.sendFile('views/index.html', { root : __dirname});
});




// catch 404 and forward to error handler
app.get('*', function(req, res) {
  res.status(404).send({message: 'You messed up!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log(`waiting for input on port ${PORT}`);
});
module.exports = app;
