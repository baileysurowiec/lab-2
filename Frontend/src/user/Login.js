import { useContext, useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../Components/Context";

export default function Login(){
    const[ username, setUsername] = useState('');
    const{dispatch} = useContext(StateContext);
    const[loginFailed, setLoginFailed] = useState(false);
    const[password, setPassword] = useState("");

    const[user, login] = useResource((username, password)=>({
        url: "/login",
        method: "post",
        data: {email: username, password},
    }))

    function handlePassword(evt){
        setPassword(evt.target.value)
    }
    useEffect(()=>{
        if(user){
                if(user?.data?.user){
                        setLoginFailed(false);
                        dispatch({type: "LOGIN", sername: user.data.user.email});
                }else{
                        setLoginFailed(true);
                }    
        }
    }, [user])

    return(
        <>
        {loginFailed && <span style = {{color: 'red'}}> Invalid username or password </span>}
        <form onSubmit = {e => { 
                e.preventDefault();
                login(username, password);
                // dispatch({type: "LOGIN", username});
        }    }>
            <label  htmlFor = "login-username"> Username: </label>
            <input  type = "text"
                    value = {username}
                    onChange = {(event)=> setUsername(event.target.value)}
                    name = "login-username"
                    id = "login-username" 
                    />
            <label  htmlFor="password"> Password: </label>

            <input  type = "password"
                    value = {password}
                    onChange = {handlePassword}
                    name = "login-username"
                    id = "login-username"
                    />
            <input  type = "submit"
                    value = "Login"
                    disabled = {username.length === 0}
                    />
        </form>
        </>
    )
}