var $todoList;
var allTodos = [];

$(document).ready(function() {

	$todoList = $('#todoTarget');
  console.log($todoList);

	$.ajax({
		method: 'GET',
		url: '/api/todos',
		success: handleSuccess,
		error: handleError
	});

	$('#newTodoForm').on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/api/todos',
			data: $(this).serialize(),
			success: newTodoSuccess,
			error: newTodoError,
		});

  	$todoList.on('click', 'b', function() {
    	console.log('clicked delete to', '/api/todos/'+$(this).attr('data-id'));
    	$.ajax({
     	 method: 'DELETE',
     	 url: '/api/todos/'+$(this).attr('data-id'),
      	success: deleteTodoSuccess,
      	error: deleteTodoError
   	 	});
  	});
});


function getTodoHtml(todo) {
  return `<hr>
          <p>
            <b>${todo.task}</b>
          </p>`;
}


function getAllTodosHtml(todos) {
  console.log(todos);
  return todos.map(getTodoHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $todoList.empty();

  // pass `allTodos` into the template function
  var todosHtml = getAllTodosHtml(allTodos);

  // append html to the view
  $todoList.append(todosHtml);
}

function handleSuccess(json) {
  allTodos = json;
  render();
}

function handleError(e) {
  console.log('oh crap!');
  $('#todoTarget').text('Failed to load todos, is the server working?');
}

function newTodoSuccess(json) {
  $('#newTodoForm input').val('');
  allTodos.push(json);
  render();
}

function newTodoError() {
  console.log('newtodo error!');
}

function deleteTodoSuccess(json) {
  var todo = json;
  console.log(json);
  var todoId = todo._id;
  console.log('delete todo', todoId);
  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allTodos.length; index++) {
    if(allTodos[index]._id === TodoId) {
      allTodos.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteTodoError() {
  console.log('deletetodo error!');
}

});






