const controller = require('../controllers/todo');

// Create a new todo

module.exports = function todoRoute(app) {

    // Create a new todo
    app.post('/todos', controller.createTodos);

    // Get all todos
    app.get('/todos', controller.getTodos);


    // Update a todo
    app.put('/todos/:id', controller.updateTodo);

    // Delete a todo
    app.delete('/todos/:id', controller.deleteTodos)

}