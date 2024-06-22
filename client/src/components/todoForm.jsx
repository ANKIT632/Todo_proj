/* eslint-disable no-undef */
import  { useState } from 'react';
import axios from 'axios';

function TodoForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const response = await axios.post(process.env.REACT_APP_API_URL+"/todos", { name, description });
    console.log(response.data);
    setName('');
    setDescription('');}
    catch(err){
    // alert('Error in creating todo try again')
    console.log(err);
    }
  };

  return (
    <div className=' mt-4'>

    <h4 className='m-2 font-mono font-bold'>Add Todo</h4>
    <div className='w-full flex flex-col max-md:items-center '>
    <form onSubmit={handleSubmit} className="space-y-4 md:w-[60%] max-md:w-[97%] md:ml-2">
  
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Description"
      />
      <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
    </div>
    </div>
  );
}

export default TodoForm;