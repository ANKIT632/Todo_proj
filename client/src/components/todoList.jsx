/* eslint-disable no-undef */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";



function TodoList() {
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  // get data
  const fetchTodos = async () => {
    try{
    const response = await axios.get(process.env.REACT_APP_API_URL + "/todos");
    
    setTodos(response.data.data);

    }
    catch(err){
      // alert('Error in fetching todos try again');
    }
  };


  // delete todo
  const deleteTodo = async (id) => {
    try{
    const response = await axios.delete(process.env.REACT_APP_API_URL + "/todos/" + id);
 
   alert(response.data.message)
    fetchTodos();
    }
    catch(err){
      // alert('Error in deleting todo try again')
    }
  }


  const editData = (name, description, date, id) => {
    setEditTodoId(id)
    setName(name);
    setDescription(description);
    setDate(date);

  }
//
  const updateHanddler = async (id) => {
    try{
    const response = await axios.put(process.env.REACT_APP_API_URL + "/todos/" + id, {
      name: name,
      description: description,
      date: date
    });
   alert(response.data.message)
  
    fetchTodos();
    setEditTodoId(null);}
    catch(err){
      // alert('Error in updating todo try again');
    }
  
  }

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  return (
    <div className=' mt-5 w-full '>
      <h1 className='text-xl font-bold ml-4'>Todo List</h1>

     { todos.length?<div className='flex flex-col m-2  max-md:overflow-x-scroll overflow-y-hidden text-center  items-center  '>
        <table className=" table-auto shadow-md md:w-[97%]">
          <thead>
            <tr>
              <th className="px-4 py-2 border bg-blue-800 text-white">Name</th>
              <th className="px-4 py-2 border bg-blue-800 text-white">Description</th>
              <th className="px-4 py-2 border bg-blue-800 text-white">Date</th>
              <th className="px-4 py-2 border bg-blue-800 text-white">Action</th>
            </tr>
          </thead>
          <tbody className='text-sm font-semibold '>
            {todos.map((todo) => (
              <tr key={todo._id}>
                <td className="px-2 py-1.5 border w-fit ">
                  <input

                    type="text"
                    name='name'
                    value={(editTodoId === todo._id) ? name : todo.name}
                    readOnly={editTodoId === todo._id ? false : true}
                    className={` w-full p-1.5 border-none outline-none ${editTodoId === todo._id ? 'bg-blue-100 rounded-md cursor-text' : ''}`}
                    onChange={(e) => setName(e.target.value)}

                  />
                </td>
                <td className="px-2 py-1.5 border"> <input
                 
                  type="text"
                  name='description'
                  value={(editTodoId === todo._id) ? description : todo.description}
                  readOnly={editTodoId === todo._id ? false : true}
                  className={` w-full p-1.5 border-none outline-none ${editTodoId === todo._id ? 'bg-blue-100 rounded-md cursor-text' : ''}`}
                  onChange={(e) => setDescription(e.target.value)}

                />
                </td>
                <td className="px-2 py-1.5 border"><input
                  id='date'
                  type="date"
                  name='Date'
                  value={(editTodoId === todo._id) ?new Date(date).toISOString().split('T')[0]: new Date(todo.Date).toISOString().split('T')[0]}
                  readOnly={editTodoId === todo._id ? false : true}
                  className={` w-full p-1.5 border-none outline-none`}
                  onChange={(e) => setDate(e.target.value)}/>
                  </td>


                <td className="px-2 py-1.5 border text-lg">
                  <div className='flex gap-8 cursor-pointer'>
                    {(editTodoId !== todo._id) ? <TfiWrite className='text-blue-500 cursor-pointer' onClick={() => editData(todo.name, todo.description, todo.Date, todo._id)} /> : <button  className='text-sm font-semibold bg-green-400 rounded-sm px-2 text-white' onClick={()=>updateHanddler(todo._id)}>Update</button>}
                    <MdDeleteForever className='text-red-500' onClick={() => deleteTodo(todo._id)} />

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>:<h4 className='m-2 text-center font-mono font-bold'>Not todos found</h4>}
    </div>
  );
}

export default TodoList;