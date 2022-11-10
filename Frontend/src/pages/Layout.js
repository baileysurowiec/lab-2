import React from "react";
import UserBar from "../user/UserBar";
import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
        <header align = "center">My Todo List</header>
        <React.Suspense fallback = {"Loading..."}>
            <UserBar/>
        </React.Suspense>{" "}
        <br/>
        <Outlet/>
        </>
    )
}