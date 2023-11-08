import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

    return (
        <>
            <ul className = "navbar">
                <li><NavLink to="/sales">Sales Overview</NavLink></li>
                <li><NavLink to="/stores">Store Details</NavLink></li>
                <li><NavLink to="/products">Product Details</NavLink></li>
            </ul>
        </>
    )
}

export default NavBar