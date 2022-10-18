import UserBar from "./user/UserBar";
import TodoList from "./ToDo/TodoList";
import CreateTodo from "./ToDo/CreateTodo";
import{v4 as uuidv4} from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useReducer} from "react";
import appReducer from "./Reducers";


function App() {
  const myTodoList = [
    {
      title: "Cleaning",
      content: "vaccuum",
      author: "Bailey",
      id: uuidv4(),
      dateCreated: ((new Date(Date.now())).toString()),
    },
    {
      title: "Homework",
      content: " CSC 435 ",
      author: "Bailey",
      id: uuidv4(),
      dateCreated: ((new Date(Date.now())).toString()),
    }
  ]

  const[state, dispatch] = useReducer(appReducer, {
    user:"", 
    todos: myTodoList});

  return (
    <div>
      <UserBar user={state.user} dispatch={dispatch} />
      <TodoList todos={state.todos} />
      {state.user && (
        <CreateTodo 
        user={state.user} 
        todos={state.todos} 
        dispatch={dispatch} 
        />
      )}
    </div>
  );
}

export default App;