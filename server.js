// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
 { _id: 7, task: 'Laundry', description: 'Wash clothes' },
 { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
 { _id: 44, task: 'Homework', description: 'Make this app super awesome!' }
 ];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  res.json({todos: todos});
});

app.get('/api/todos', function index(req, res) {
  // var todosArray = {todos: todos};
  // res.json(todosArray)
  res.status(200).json({todos: todos});

  /* This endpoint responds with all of the todos
   */
});

app.post('/api/todos', function create(req, res) {
  // create new todo with form data (`req.body`)
    var newTodo = req.body;
 // set sequential id (last id in `todos` array + 1)
    if (todos.length > 0) {
    newTodo._id = todos[todos.length - 1]._id + 1;
      } else {
          newTodo._id = 1;
      }
 // add newTodo to `todos` array
 todos.push(newTodo);
 // send newTodo as JSON response
 res.json(newTodo);
});


app.get('/api/todos/:id', function show(req, res) {
// get todo id from url params (`req.params`)
  var todoId = parseInt(req.params.id);
// find todo to by its id
  var foundTodo = todos.filter(function (todo) {
    return todo._id == todoId;
})[0];
// send foundTodo as JSON response
  res.json(foundTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  // get todo id from url params (`req.params`)
  var todoId = parseInt(req.params.id);
  // find todo to update by its id
  var todoToUpdate = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];
  // update the todo's task
  todoToUpdate.task = req.body.task;

  // update the todo's description
  todoToUpdate.description = req.body.description;

  res.json(todoToUpdate);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  req.params.id
  // get todo id from url params (`req.params`)
    var todoId = parseInt(req.params.id);

    // find todo to delete by its id
    var todoToDelete = todos.filter(function (todo) {
      return todo._id == todoId;
    })[0];

    // remove todo from `todos` array
    todos.splice(todos.indexOf(todoToDelete), 1);

    // send back deleted todo
    res.json(todoToDelete);
  });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
