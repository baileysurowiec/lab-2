import UserBar from "./user/UserBar";
import TodoList from "./ToDo/TodoList";
import CreateTodo from "./ToDo/CreateTodo";
import{v4 as uuidv4} from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useReducer} from "react";
import appReducer from "./Reducers";
import { StateContext } from "./Components/Context";
import {useEffect} from "react";
import { useResource } from 'react-request-hook';
import Layout from "./pages/Layout";


function App() {
  const myTodoList = []

  const[state, dispatch] = useReducer(appReducer, {
    user:"", 
    todos: myTodoList});

    // const[state, dispatch] = useReducer(appReducer, {user: {}, todos: []});

  const [ todos, getTodos ] = useResource(() => ({
      url: '/todos',
      method: 'get',
      // headers: {"Authorization": `${state?.user?.access_token}`},
    }))

 useEffect(getTodos, [])
//  useEffect(()=>{
//   getTodos();
//  }, [state?.user?.access_token]);

 useEffect(() => {
  // if(todos && todos.isLoading === false && todos.data){
    // dispatch({type: "FETCH_TODOS", todos: todos.data.todos.reverse()});
        if (todos && todos.data) {
            dispatch({ type: 'FETCH_TODOS', todos: todos.data.reverse() })
        }
 }, [todos])


  return (
    <div>
      <StateContext.Provider value = {{state, dispatch}}>
      {/* <UserBar /> */}
      <Layout/>
      <TodoList />
      {state.user && (
        <CreateTodo/>
      )}
      </StateContext.Provider>
    </div>
  );
}

export default App;