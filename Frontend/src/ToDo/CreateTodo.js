import { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import{v4 as uuidv4} from "uuid";
import { StateContext } from "../Components/Context";


export default function CreateTodo(){
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const {state, dispatch} = useContext(StateContext);
    const{user} = state;
    const [error, setError] = useState(false);


    const[todo, createTodo] = useResource(({title, content, author})=>({
        url: "./todos",
        method: "post",
        data: {title, content, author},
    }));

  // ensure the newly created post didn't return an error, handle if it did
  useEffect(() => {
    if (todo?.error) {
      setError(true);
    }
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        content: todo.data.content,
        author: todo.data.author,
        id: todo.data.id,
      });
    }
  }, [todo]);


    return(
        <form
        onSubmit = {e=> {
            e.preventDefault();
            createTodo({title, content, author:user});

            dispatch({
                type: "CREATE_TODO",
                title,
                content,
                author: user,
                id: uuidv4(),
                dateCreated: ((new Date(Date.now())).toString()),
                dispatch,
                isComplete: false,
                dateCompleted: ""
            });
        }}>
            <div> Author: <b>{user}</b>
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