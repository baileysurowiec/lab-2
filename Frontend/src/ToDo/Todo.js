import { useState } from "react";
import { useResource } from "react-request-hook";
import React from "react";
import { Link } from "react-router-dom";

function Todo({title, content, author, id, _id, dateCreated, 
                              dispatch, isComplete, dateCompleted}){


    const[toUpdate, updateTodo] = useResource((title, content, author,
      id, dateCreated, isComplete, dateCompleted)=>({
        url: `/auth/todo/update/${id}`,
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
      url: `/auth/todo/delete/${id}`,
      method: "DELETE",
    }));

    return(
        <div>
          {/* <Link to={`/todo/${_id}`}> */}
            <h3 className = "display 3">{title} </h3>
            {/* </Link> */}
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
                }} 
                />
            Date Completed: {dateCompleted}
            <br/>
            <input 
                type="submit" 
                value="Delete" 
                onClick={e => { 
                    e.preventDefault(); 
                    deleteTodo(id);
                    dispatch({ type: "DELETE_TODO", id}); }}
                />
            <br/><br/>
            </div>
        </div>
    )
}
export default React.memo(Todo);