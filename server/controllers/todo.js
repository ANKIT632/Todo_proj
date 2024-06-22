const Todo = require('../models/todo');

// Create a new todo
exports.createTodos = async (req, res) => {

    const todo = new Todo(req.body);

    try {

        await todo.save();

        return res.status(201).send({ status: true, message: "Todo created successfully" });
    }

    catch (err) {
        return res.status(500).send({ status: false, message: "Try again !!" });
    }
}


// Get all todos

exports.getTodos = async (req, res) => {
    const pageSize = 30;
    const page = Number(req.query.page) || 1;

  
    try {
      const numberOfTodos = await Todo.countDocuments({});
      const todos = await Todo.find()
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize);
  
      return res.status(200).send({
        totalPages: Math.ceil(numberOfTodos / pageSize),
        status: true,
        data: todos,
        
      });
    } catch (err) {
      return res.status(500).send({ status: false, message: "try Again !!"});
    }
  };

// Update a todo

exports.updateTodo = async (req, res) => {

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTodo) {
            return res.status(400).send({ status: false, message: 'No todo found to update' });
        }

        res.status(200).send({ status: true, message:"update successful" });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "upadate failed try again !!" });
    }

}

// delete a todo
exports.deleteTodos = async (req, res) => {

    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(400).send({ message: 'No todo found to delete' });
        }
        res.status(200).send({ status: true, message: 'Todo deleted successfully' });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: "try again !!" });
    }
} 

