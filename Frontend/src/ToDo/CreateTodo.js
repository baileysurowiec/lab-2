import { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import{v4 as uuidv4} from "uuid";
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
        method:"post",
        data:{title, content, author, 
            dateCreated, isComplete:false},
    }));

    useEffect(() => {
        if(todo?.error){
            setError(true);
        }
        if (todo?.isLoading === false && todo?.data) {
          dispatch({
            type: "CREATE_TODO",
            title: todo.data.title,
            // content,
            content: todo.data.content,
            author: todo.data.author,
            id: todo.data.id,
            dateCreated: todo.data.dateCreated,
            // dispatch: todo.data.dispatch,
            isComplete: false,
            // dateCompleted: todo.data.dateCompleted,
          });
        }
      }, [todo]);

    return(
        <form
        onSubmit = {e=> {
            e.preventDefault();
            // const newID = uuidv4();
            const newDate = ((new Date(Date.now())).toString())
            createTodo({
                title, 
                content, 
                author: user, 
                // id: newID, 
                // dateCreated: ((new Date(Date.now())).toString()), 
                dateCreated: newDate,
                isComplete: false, });
            // dispatch({
            //     type: "CREATE_TODO",
            //     title,
            //     content,
            //     author: user,
            //     id: newID,
            //     dateCreated: newDate,
            //     // dateCreated: ((new Date(Date.now())).toString()),
            //     // dispatch,
            //     isComplete: false,
            //     // dateCompleted: ""
            // });
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