import { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import React from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../Components/Context";

function Todo({title, content, author, _id, id, dateCreated, 
                isComplete, dateCompleted}){

    const {state, dispatch} = useContext(StateContext);


    const[toUpdate, updateTodo] = useResource((title, content, author,
      _id, dateCreated, isComplete, dateCompleted)=>({
        url: `/auth/todo/update/${_id}`,
        // use put to update not post
        method: "PUT",
        headers: {"Authorization": `${state.user.access_token}`},
        data:{ title, content, author, dateCreated, 
              isComplete, dateCompleted}
    }));

    function toggleTodoItem(title, content, author, _id, isComplete){
      let newDateCompleted = new Date(Date.now());
      if(!isComplete){
        dateCompleted = newDateCompleted;
      }
      else{
        dateCompleted = "";
      }
      isComplete = !isComplete;
      console.log(isComplete)
      updateTodo(title, content, author, _id, dateCreated, isComplete, dateCompleted);
      dispatch({
        type: "TOGGLE_TODO", 
        id: _id, 
        // id,
        isComplete, 
        dateCompleted });
    }

    const[toDelete, deleteTodo] = useResource((_id)=>({
      url: `/auth/todo/delete/${_id}`,
      method: "DELETE",
      headers: {"Authorization": `${state.user.access_token}`}
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
                  toggleTodoItem(title, content, author, _id, dateCreated, isComplete);
                }} 
                />
            Date Completed: {dateCompleted}
            <br/>
            <input 
                type="submit" 
                value="Delete" 
                onClick={e => { 
                    e.preventDefault(); 
                    deleteTodo(_id);
                    dispatch({ 
                      type: "DELETE_TODO", 
                      id:_id }
                      // id,}
                      ); }}
                />
            <br/><br/>
            </div>
        </div>
    )
}
export default React.memo(Todo);