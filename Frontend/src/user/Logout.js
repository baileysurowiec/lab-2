import { useContext } from "react";
import { StateContext } from "../Components/Context";
import {batch} from "react-redux";

export default function Logout(){
    const{state, dispatch} = useContext(StateContext);
    const{user} = state;


    return(
        <form onSubmit={e => {
            e.preventDefault(); 
            // batch(()=>{
            //     dispatch({type: "LOGOUT"});
            //     dispatch({type: "CLEAR_POSTS"});
            // })
            dispatch({type: "LOGOUT"});
            dispatch({type: "CLEAR_POSTS"});
            }}>
            <div align = "right">
            Logged in as: <b>{user.username}</b>
            <input  type = "submit"
                    value = "Logout" />
            </div>
        </form>

    )
}