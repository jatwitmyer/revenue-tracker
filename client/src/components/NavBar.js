import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

    return (
        <div className = "topnav">
            <img src="SeekPng.com_dollar-sign-png_4035489.png" alt="" title=""/>
            {/* <i class="fa fa-usd" aria-hidden="true"></i> */}
            <NavLink className="left-nav" to="/overview">Overview</NavLink>
            <p>Revenue Tracker</p>
            <a className="right-nav" href="/">Log Out</a>
            <NavLink className="right-nav" to="/account">Account</NavLink>
        </div>
    )
}

export default NavBar