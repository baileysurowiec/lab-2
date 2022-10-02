import UserBar from "./user/UserBar";
import TodoList from "./ToDo/TodoList";
import { useState } from "react";
import CreateTodo from "./ToDo/CreateTodo";

function App() {
  const myTodoList = [
    {
      title: "Cleaning",
      content: " vaccuum",
      author: "Bailey"
    },
    {
      title: "Homework",
      content: " CSC 435 ",
      author: "Bailey"
    },
  ]
  const[user, setUser] = useState('');
  const[ todo, setTodo] = useState(myTodoList);

  return (
    <div>
      <h1>To-do List</h1>
      <UserBar
      user = {user}
      setUser= {setUser}
      /> 
      <TodoList
        todos= {todo}/>
        {user && 
          <CreateTodo
            user = {user}
            todos = {todo}
            setTodo = {setTodo}
          />}
  
    </div>
  );
}

export default App;