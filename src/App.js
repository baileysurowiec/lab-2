import UserBar from "./user/UserBar";
import TodoList from "./ToDo/TodoList";
import { useState } from "react";
import CreateTodo from "./ToDo/CreateTodo";
import{v4 as uuidv4} from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const myTodoList = [
    {
      title: "Cleaning",
      content: " vaccuum",
      author: "Bailey",
      dateCreated: ((new Date(Date.now())).toString()),
      isComplete: (false),
      id: uuidv4()
    },
    {
      title: "Homework",
      content: " CSC 435 ",
      author: "Bailey",
      dateCreated: ((new Date(Date.now())).toString()),
      isComplete: (false),
      id: uuidv4()

    },
  ]
  const[user, setUser] = useState('');
  const[ todo, setTodo] = useState(myTodoList);

  return (
    <div>
      <h1 align = "center"> To-do List</h1>
      
      <UserBar
      user = {user}
      setUser= {setUser}
      /> 
      <TodoList
        todos = {todo}/>
        {user && 
          <CreateTodo
            user = {user}
            todos = {todo}
            setTodo = {setTodo}
            dateCreated = {((new Date(Date.now())).toString())}
          />}  
    </div>
  );
}

export default App;