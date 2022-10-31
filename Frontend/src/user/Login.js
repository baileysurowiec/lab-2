import { useContext, useState } from "react";
import { StateContext } from "../Components/Context";

export default function Login(){
    const[ username, setUsername] = useState('');
    const{dispatch} = useContext(StateContext);

    return(
        <form onSubmit = {e => { 
                e.preventDefault();
                dispatch({type: "LOGIN", username});}
            }>
            <label  htmlFor = "login-username"> Username: </label>
            <input  type = "text"
                    value = {username}
                    onChange = {(event)=> setUsername(event.target.value)}
                    name = "login-username"
                    id = "login-username" 
                    />
            <label  htmlFor="password"> Password: </label>
            <input  type = "password"
                    name = "login-password"
                    id = "login-password"
                    />
            <input  type = "submit"
                    value = "Login"
                    disabled = {username.length === 0}
                    />
        </form>
    )
}