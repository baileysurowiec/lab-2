import { useState } from "react";

export default function Todo({title, content, author, id, dateCreated, dispatch, isComplete, dateCompleted}){
    // const[dateComplete, setDateCompleted] = useState("");
    // const[isComplete, setIsComplete] = useState(false);

    // function handleCompleteTodo(){
    //     setIsComplete(!isComplete)
    //     document.getElementById(id).checked = isComplete;
    //     dispatch({type: "TOGGLE_TODO", id, isComplete});
    //     // console.log(isComplete)
    //     // if(isComplete){
    //     //     setDateCompleted((new Date(Date.now())).toString())
    //     // }
    //     // else{
    //     //     setDateCompleted(" ")
    //     // }
    // }

    return(
        <div>
            <h3 className = "display 3">{title} </h3>
            <div>{content}</div>
            <br/>
            <i>Created by <b>{author}</b> on {dateCreated}</i>
            <div>
            <input 
                type="checkbox" 
                value={false} 
                onChange={(event)=>{ 
                    dispatch({type: "TOGGLE_TODO", id, status: event.target.checked})           
    }}/>
            Date Completed: {dateCompleted}
            <br/>
            <input 
                type="submit" 
                value="Delete" 
                onClick={e => { 
                    e.preventDefault(); 
                    // console.log("deleted");
                    dispatch({ type: "DELETE_TODO", id}); }}
                />
            <br/>
            </div>
        </div>
    )
}