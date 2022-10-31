import Login from "./Login";
import Logout from "./Logout"
import Register from "./Register"
import { useContext, useState } from "react";
import { StateContext } from "../Components/Context";

export default function UserBar(){
    const {state} = useContext(StateContext);
    if(state.user){
        return < Logout
                    />
    }

    else{
        return(
            <div align = "left">
            <Login />
            <Register/>
            </div>
        )
    }
}