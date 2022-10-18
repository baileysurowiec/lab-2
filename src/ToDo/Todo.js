import { useState } from "react";

export default function Todo({title, content, author, id, dateCreated}){
    const[dateComplete, setDateCompleted] = useState("");
    const[isComplete, setIsComplete] = useState(false);

    function handleCompleteTodo(){
        setIsComplete(!isComplete)
        document.getElementById(id).checked = isComplete;
        // console.log(isComplete)
        if(isComplete){
            setDateCompleted((new Date(Date.now())).toString())
        }
        else{
            setDateCompleted(" ")
        }
    }

    return(
        <div>
            <h3 className = "display 3">{title} </h3>
            <div>{content}</div>
            <br/>
            <i>Created by <b>{author}</b> on {dateCreated}</i>
            <div>
            
            <input 
                type="checkbox" 
                value = {false} 
                id={id}
                onChange={handleCompleteTodo}
            />
            Date Completed: {dateComplete}
            </div>
        </div>
    )
}