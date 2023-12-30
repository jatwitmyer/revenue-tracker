import React from "react";
import NavBar from "./NavBar";
import Sales from "./Sales";
import Products from "./Products";
import Stores from "./Stores";
import { Switch, Route } from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <NavBar />
            <div className="tab-content">
            <Switch>
                <Route exact path="/sales">
                    <Sales />
                </Route>
                <Route exact path="/stores">
                    <Stores />
                </Route>
                <Route exact path="/products">
                    <Products />
                </Route>
            </Switch>
            </div>
        </div>
    );
}

export default App;