import { useContext, useState } from "react";
import{v4 as uuidv4} from "uuid";
import { StateContext } from "../Components/Context";


export default function CreateTodo(){
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const {state, dispatch} = useContext(StateContext);
    const{user} = state;


    return(
        <form
        onSubmit = {e=> {
            e.preventDefault();

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