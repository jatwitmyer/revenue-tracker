import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Products from "./Products";
import Stores from "./Stores";
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/sales">
                </Route>
                <Route exact path="/stores">
                </Route>
                <Route exact path="/products">
                </Route>
            </Switch>
            <Stores />
            <Products />
        </div>
    );
}

export default App;