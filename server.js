const db = require('./models');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var Todo = require('./models/todo');
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

app.get('/api/todos', function (req,res){
	console.log('hello');
	db.Todo.find(function(err, mytodo){
		res.render('index', {mytodo:mytodo});
	});
});
// create new todo
app.post('/api/todos', function (req, res) {
  // create new todo with form data (`req.body`)
  var newTodo = new todo({task: req.body});
  db.Todo.save(function(err, mytodo){  
        if (err) {
          console.log("index error: " + err);
          res.sendStatus(500);  
        } 
    res.json(mytodo);
  }); 
});

// update list
app.put('/api/todos/:id', function(req,res) {
// get book id from url params (`req.params`)
  console.log('todos update', req.params);
  var todoId = req.params.id;
  // find the index of the book we want to remove
  	db.Todo.update(todoId, function(err, todo) {
        if (err) {
          console.log("index error: " + err);
          res.sendStatus(500);  
        } 
  		res.json(todo);
	});
});

// delete todo item
app.delete('/api/todos/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('todos delete', req.params);
  var todoId = req.params.id;
  	db.Todo.findOneAndRemove(todoId, function(err, todo) {
        if (err) {
          console.log("index error: " + err);
          res.sendStatus(500);  
        } 
  		res.json(todoToDelete);
  	});
  }
);

// catch 404 and forward to error handler
app.get('*', function(req, res) {
  res.status(404).send({message: 'You messed up!'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log(`waiting for input on port ${PORT}`);
});

module.exports = app;
