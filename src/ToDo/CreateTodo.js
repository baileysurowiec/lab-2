import { useState } from "react";
import{v4 as uuidv4} from "uuid";


export default function CreateTodo({user, todos, setTodo, dispatch }){
    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');


    return(
        <form
        onSubmit = {e=> {
            e.preventDefault();
            const newTodo = {
                title, content, author: user, id: uuidv4()
            };
            setTodo([newTodo,...todos]);

            // dispatch({
            //     type: "CREATE_TODO",
            //     title,
            //     content,
            //     author: user,
            //     id: uuidv4(),
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