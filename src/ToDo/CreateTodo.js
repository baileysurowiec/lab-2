import { useState } from "react";

export default function CreateTodo({user, todos, setTodo}){
    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const[date, setDate] = useState()

    return(
        <form   onSubmit = {e=> {
            e.preventDefault();
            const newTodo = {
                title, content, author: user
            };
            setTodo([newTodo,...todos])
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
                    value = "Create" />
        </form>
    )
}