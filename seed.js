var db = require('./models');
var todo_list = [
	{
		task: "do things with the stuff",
		description: "busy work"
	},
	{
		task: "eat food",
		description: "important"
	}

];

// remove all records that match {} -- which means remove ALL records
  db.Todo.remove({}, function(err, todos){
    if(err) {
      console.log('Error occurred in remove', err);
    } else {
      console.log('removed all todos');

    // create new records based on the array books_list
    db.Todo.create(todo_list, function(err, todos){
      if (err) { return console.log('err', err); }
      console.log("created", todos.length, "todos");
      process.exit();
    });
    }
  });