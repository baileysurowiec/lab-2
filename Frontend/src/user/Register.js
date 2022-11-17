import { useContext, useState, useEffect } from "react";
import { StateContext } from "../Components/Context";
import { useResource } from "react-request-hook";

export default function Register(){
        const[ username, setUsername] = useState("");
        const[ password, setPassword] = useState("");
        const[ repeatPassword, setPasswordRepeat] = useState("");
        const[status, setStatus] = useState("");

        const{dispatch} = useContext(StateContext);

        // function handleUsername(e) {setUsername(e.target.value)}
        function handlePassword(e) {setPassword(e.target.value)}
        function handlePasswordRepeat(e) {setPasswordRepeat(e.target.value)}

// const [ user, register ] = useResource((username, password) => ({
//   url: '/users',
//   method: 'post',
//   data: { email:username, password }
// }));

// useEffect(() => {
//   if (user && user.data && user.data.user.email) {
//       dispatch({ type: 'REGISTER', username:user.data.user.email })
//   }
// }, [user]);

        const [user, register] = useResource((username, password) => ({
            url: "auth/register",
            method: "post",
            data: {username, password, passwordConfirmation: password},
          }));

          useEffect(()=>{
            if(user && user.isLoading === false && (user.data || user.error)){
              if(user.error){
                setStatus("Registration failed, please try again later.");
              }
              else{
                setStatus("Registration successful. You may now login.");
              }
            }
          }, [user]);
        
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                register(username, password);
        }}>
            <label  htmlFor="register-username"> Username: </label>
            <input
                type = "text" 
                value={username}
                onChange = {(event) => setUsername(event.target.value)}
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
              <p>{status}</p>
        </form>
    )
}