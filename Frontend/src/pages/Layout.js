import React, {useContext} from "react";
import UserBar from "../user/UserBar";
import { Outlet, Link } from "react-router-dom";
import { StateContext } from "../Components/Context";

export default function Layout(){
    const { state } = useContext(StateContext);
    const { user } = state;
    return(
        <>
        <header align = "center">My Todo List</header>
        <React.Suspense fallback = {"Loading..."}>
            <UserBar/>
        </React.Suspense>{" "}
        <br/>
        {/* {user && <Link to="/todo/create">Create New Todo</Link>} */}
        <Outlet/>
        </>
    )
}