const mongoose =require('mongoose');

const todoSchema = new mongoose.Schema({

     name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      Date:{
        type: Date,
        default: Date.now,
      }

},{timestamps:true})

module.exports = mongoose.model('Todo', todoSchema);