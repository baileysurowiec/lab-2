import { useContext, useState } from "react";
import { StateContext } from "../Components/Context";

export default function Register(){
        const[ username, setUsername] = useState('');
        const[ password, setPassword] = useState('');
        const[ repeatPassword, setPasswordRepeat] = useState('');

        function handleUsername(e) {setUsername(e.target.value)}
        function handlePassword(e) {setPassword(e.target.value)}
        function handlePasswordRepeat(e) {setPasswordRepeat(e.target.value)}

        const{dispatch} = useContext(StateContext);

    return(
        <form   onSubmit = { e => {e.preventDefault(); 
                                    dispatch({type: "REGISTER", username});}}>
            <label  htmlFor="register-username"> Username: </label>
            <input
                type = "text" 
                value={username}
                onChange = {handleUsername}
                name = "register-username"
                id = "register-username" />
            <label  htmlFor="register-password"> Password: </label>
            <input 
                type = "password"
                value={password}
                onChange = {handlePassword}
                name = "register-password"
                id = "register-password" />
            <label  htmlFor="register-password-repeat"> Repeat Password: </label>
            <input 
                type = "password"
                value={repeatPassword}
                onChange = {handlePasswordRepeat}
                name = "register-password-repeat"
                id = "register-password-repeat" />
            <input 
                type= "submit"
                value = "Register"
                disabled = {
                        username.length === 0 || password.length === 0 || password !== repeatPassword
                } />
        </form>
    )
}