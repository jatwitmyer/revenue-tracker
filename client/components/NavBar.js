import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {

    return (
        <>
            <br></br>
            <ul>
                <li><NavLink to="/sales">Sales</NavLink></li>
                <li><NavLink to="/stores">Stores</NavLink></li>
                <li><NavLink to="/products">Products</NavLink></li>
            </ul>
        </>
    )
}

export default NavBar