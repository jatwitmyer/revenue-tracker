import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

    return (
        <>  
            <div class="header">
                <h1>Revenue Tracker</h1>
                <p>Welcome to Revenue Tracker!</p>
            </div>
            <div className = "topnav">
                <a><NavLink to="/sales">Sales Overview</NavLink></a>
                <a><NavLink to="/stores">Store Details</NavLink></a>
                <a><NavLink to="/products">Product Details</NavLink></a>
            </div>
        </>
    )
}

export default NavBar