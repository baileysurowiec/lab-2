import { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../Components/Context";


export default function CreateTodo(){
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[error, setError] = useState(false);

    const {state, dispatch} = useContext(StateContext);
    const{user} = state;

    const[todo, createTodo] = useResource(({title, content, author, 
                                     dateCreated, isComplete})=>({
        url: "/todos",
        method:"POST",
        // headers: {"Authorization": `${state.user.access_token}`},
        // data: {title, content}
        data:{title, content, author, 
            dateCreated, isComplete},
    }));

    useEffect(() => {
        if(todo?.error){
            setError(true);
        }
        // if (todo.isLoading === false && todo.data){
        if (todo?.isLoading === false && todo?.data) {
          dispatch({
            type: "CREATE_TODO",
            title: todo.data.title,
            content: todo.data.content,
            author: todo.data.author,
            // author: user.username
            id: todo.data.id,
            dateCreated: todo.data.dateCreated,
            isComplete: todo.data.isComplete,
          });
        }
      }, [todo]);

    return(
        <form
        onSubmit = {e=> {
            e.preventDefault();
            const newDate = ((new Date(Date.now())).toString())
            createTodo({
                title, 
                content, 
                author: user, 
                dateCreated: newDate,
                isComplete: false, });
        }}>
            <div> Author: <b>{user.username}</b>
            </div>
            <div>
                <label
                    htmlFor= "create-title"> Title: </label>
                <input 
                    type = "text"
                    value={title}
                    onChange = {(e) => setTitle(e.target.value)}
                    name = "create-title"
                    id = "create-title" />
            </div>
            <textarea
                value={content}
                onChange = {(e)=> setContent(e.target.value)}
                />
            <input  type = "submit"
                    value = "Create"
                />
        </form>
    )
}