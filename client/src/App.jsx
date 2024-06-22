import Navbar from "./components/navbar"
import TodoList from "./components/todoList"
import TodoForm from "./components/todoForm"
import { useState } from "react"
function App() {

  const [ref,setRef]=useState(false)

  return (
    <>
    
      <Navbar/>
      <TodoForm  setRef={setRef}/>
      <TodoList refresh={ref} />
    </>
  )
}

export default App
