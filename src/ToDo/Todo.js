import { useState } from "react";

const dateCreated = new Date(Date.now()).toString();

export default function Todo({title, content, author, id}){
    const[dateComplete, setDateCompleted] = useState("");
    const[isComplete, setIsComplete] = useState(false);


    // function handleCompleteTodo(e){
    //     setIsComplete(!isComplete)
    //     if(e.target.isComplete){
    //         setDateCompleted((new Date(Date.now())).toString())
    //     }
    //     else{
    //         setDateCompleted(" still working ")
    //     }
    //     console.log(isComplete)
    // }

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
                value = {isComplete} 
                id={id}
                onChange={handleCompleteTodo}
            />
            Date Completed: {dateComplete}
            </div>
        </div>
    )
}