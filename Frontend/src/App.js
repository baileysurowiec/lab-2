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
// import TodoPage from "./pages/TodoPage";
// import HomePage from "./pages/HomePage";
// import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const myTodoList = []
  const[state, dispatch] = useReducer(appReducer, {user: {}, todos: []});

  // const[state, dispatch] = useReducer(appReducer, {
  //   user:"", 
  //   todos: myTodoList});

  const {user} = state;
// const [ todos, getTodos ] = useResource(() => ({
//   url: '/todos',
//   method: 'get'
// }))

// useEffect(getTodos, [])
// useEffect(() => {
//   if (todos && todos.data) {
//       dispatch({ type: 'FETCH_TODOS', todos: todos.data.reverse() })
//   }
// }, [todos])

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Todo List`;
    } else {
      document.title = "Todo List";
    }
  }, [user]);

  const [ todos, getTodos ] = useResource(() => ({
      url: '/todo', //? '/auth/todo'
      method: 'get',
      headers: {"Authorization": `${state?.user?.access_token}`},
    }));


  useEffect(()=>{
      getTodos();
  }, [state?.user?.access_token]);

 useEffect(() => {
  if(todos && todos.isLoading === false && todos.data){
    dispatch({type: "FETCH_TODOS", todos: todos.data.todos.reverse()});
        }
 }, [todos])

// //  return (
// //   <div>
// //     <StateContext.Provider value={{ state, dispatch }}>
// //         <BrowserRouter>
// //           <Routes>
// //             <Route path="/" element={<Layout />}>
// //               <Route index element={<HomePage />} />
// //             </Route>
// //             <Route path="/todo" element={<Layout />}>
// //               <Route path="/todo/create" element={<CreateTodo />} />
// //               <Route path="/todo/:id" element={<TodoPage />} />
// //             </Route>
// //           </Routes>
// //         </BrowserRouter>
// //     </StateContext.Provider>
// //   </div>
// // );
  
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