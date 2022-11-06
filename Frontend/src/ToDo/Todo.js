import { useState } from "react";
import { useResource } from "react-request-hook";

export default function Todo({title, content, author, id, dateCreated, 
                              dispatch, isComplete, dateCompleted}){
    // const[dateComplete, setDateCompleted] = useState("");
    // const[isComplete, setIsComplete] = useState(false);

    const[toUpdate, updateTodo] = useResource((title, content, author,
      id, dateCreated, isComplete, dateCompleted)=>({
        url: "/todos/" + id,
        // use put to update not post
        method: "PUT",
        data:{ title, content, author, dateCreated, 
              isComplete, dateCompleted}
    }));

    function toggleTodoItem(title, content, author, id, isComplete){
      var newDateCompleted = (new Date(Date.now())).toString();
      if(!isComplete){
        dateCompleted = newDateCompleted;
      }
      else{
        dateCompleted = "";
      }
      isComplete = !isComplete;
      updateTodo(title, content, author, id, dateCreated, isComplete, dateCompleted);
      dispatch({
        type: "TOGGLE_TODO", 
        id, 
        isComplete, 
        dateCompleted });
    }

    const[toDelete, deleteTodo] = useResource((id)=>({
      url: "/todos/" + id,
      method: "DELETE",
      // data:
    }));

    return(
        <div>
            <h3 className = "display 3">{title} </h3>
            <div>{content}</div>
            <br/>
            Created by <b>{author}</b> on <i>{dateCreated}</i>
            <div>
            <input 
                type="checkbox"
                value = {isComplete}
                checked = {isComplete}
                onChange={()=>{
                  toggleTodoItem(title, content, author, id, dateCreated, isComplete); 
                    // dispatch({type: "TOGGLE_TODO", id, status: event.target.checked})           
                }} />
            Date Completed: {dateCompleted}
            <br/>
            <input 
                type="submit" 
                value="Delete" 
                onClick={e => { 
                    e.preventDefault(); 
                    // console.log("deleted");
                    deleteTodo(id);
                    dispatch({ type: "DELETE_TODO", id}); }}
                />
            <br/><br/>
            </div>
        </div>
    )
}