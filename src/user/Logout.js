import { useContext } from "react";
import { StateContext } from "../Components/Context";

export default function Logout(){
    const{state, dispatch} = useContext(StateContext);
    const{user} = state;
    return(
        <form onSubmit={e => {
            e.preventDefault(); 
            dispatch({type: "LOGOUT"});
            }}>
            <div align = "right">
            Logged in as: <b>{user}</b>
            <input  type = "submit"
                    value = "Logout" />
            </div>
        </form>

    )
}