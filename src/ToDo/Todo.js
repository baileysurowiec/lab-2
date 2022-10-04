import { useState } from "react";
import{v4 as uuidv4} from "uuid";


export default function Todo({title, content, author, dateCreated, id}){
    const[dateComplete, setDateCompleted] = useState("");
    const[isComplete, setIsComplete] = useState(false);

    const completeTodo = (e) => {
        if(e.target.isComplete){
            setDateCompleted((new Date(Date.now())).toString())
        }
        else{
            setDateCompleted(" still working ")
        }
        setIsComplete(!isComplete)
        console.log(isComplete)
    }

    return(
        <div>
            <h3>{title} </h3>
            <div>{content}</div>
            <br/>
            <i>Created by <b>{author}</b> on {dateCreated}</i>
            <div>
            
            <input 
                type="checkbox" 
                value= {isComplete} 
                id="flexCheckDefault"
                onChange={completeTodo}
            />
            Date Completed: {dateComplete}
            </div>
        </div>
    )
}