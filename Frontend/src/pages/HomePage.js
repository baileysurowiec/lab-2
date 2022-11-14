import { StateContext } from "../Components/Context";
import TodoList from "../ToDo/TodoList";
import React, {useEffect, useContext} from "react";
import { useResource } from "react-request-hook";



export default function HomePage() {
    const { state, dispatch } = useContext(StateContext);
    const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
    }));
    useEffect(() => {
        getTodos();
    }, [state?.user?.access_token]);
    useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
        dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
    }
    }, [todos]);
    return (
    <>
        {todos?.isLoading && "Todos loading..."} <TodoList />
    </>
    );
    }