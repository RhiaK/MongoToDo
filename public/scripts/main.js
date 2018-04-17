console.log("Sanity check");
var $todoList;
var allTodos = [];

$(document).ready(function() {

	$todoList = $('#todoForm');
	$.ajax({
		method: 'GET',
		url: 'api/todos',
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
			error: NewTodoError,
		});
		var textEntry = $(".textbox").val();
		$("#listItems").prepend($("<li>").html(textEntry + "</li>"));
		$(".textbox").val('');
	});

  	$todosList.on('dblclick', 'li', function() {
    	console.log('clicked delete to', '/api/todos/'+$(this).attr('data-id'));
    	$.ajax({
     	 method: 'DELETE',
     	 url: '/api/todos/'+$(this).attr('data-id'),
      	success: deleteTodoSuccess,
      	error: deleteTodoError
   	 	});
  	});
});

console.log("Sanity Check: JS is working!");
var $booksList;
var allBooks = [];

$(document).ready(function(){

  $booksList = $('#bookTarget');
  $.ajax({
    method: 'GET',
    url: '/api/books',
    success: handleSuccess,
    error: handleError
  });

  $('#newBookForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $(this).serialize(),
      success: newBookSuccess,
      error: newBookError
    });
  });

  $booksList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/books/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/books/'+$(this).attr('data-id'),
      success: deleteBookSuccess,
      error: deleteBookError
    });
  });

});

function getTodoHtml(todo) {
  return `<hr>
          <p>
            <b>${todo.task}</b>
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${todo._id}>Delete</button>
          </p>`;
}

function getAllTodosHtml(todos) {
  return todos.map(getTodoHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $todosList.empty();

  // pass `allTodos` into the template function
  var todosHtml = getAllTodosHtml(allTodos);

  // append html to the view
  $todosList.append(todosHtml);
}

function handleSuccess(json) {
  allTodos = json;
  render();
}

function handleError(e) {
  console.log('oh crap!');
  $('#todoTarget').text('Failed to load todos, is the server working?');
}

function newTodokSuccess(json) {
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
  var todoId = book._id;
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


