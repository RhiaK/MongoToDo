const db = require('./models');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Todo = require('./models');
var mongoose = require('mongoose');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
	res.render('index.ejs', { root : __dirname});
});

app.get('/api/todo', function (req,res){
	console.log('hello')
	db.Todo.find(function(err, mytodo){
		res.render('index', {mytodo:mytodo});
	});
})
// create new todo
app.post('/api/todos', function (req, res) {
  // create new book with form data (`req.body`)
  console.log('todos create', req.body);
  var newTodo = req.body;
  db.Todo.create(newTodo, function(err, mytodo){  
        if (err) {
          console.log("index error: " + err);
          res.sendStatus(500);  
        } 
    res.render('index', {mytodo:mytodo});
  }); 
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
