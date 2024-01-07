import React from "react";
import NavBar from "./NavBar";
import Sales from "./Sales";
import Products from "./Products";
import Stores from "./Stores";
import Overview from "./Overview";
import { Switch, Route } from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/"> <Overview /> </Route>
                <Route exact path="/overview"> <Overview /> </Route>
            </Switch>
        </div>
    );
}

export default App;