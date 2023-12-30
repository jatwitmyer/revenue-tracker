import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

    return (
        <>  
            <div class="header">
                <h1>Revenue Tracker</h1>
            </div>
            <div className = "topnav">
                <NavLink to="/sales">Sales Overview</NavLink>
                <NavLink to="/stores">Store Details</NavLink>
                <NavLink to="/products">Product Details</NavLink>
            </div>
        </>
    )
}

export default NavBar