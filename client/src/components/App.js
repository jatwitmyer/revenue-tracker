import React, { useState } from "react";
import NavBar from "./NavBar";
import Sales from "./Sales";
import Products from "./Products";
import Stores from "./Stores";
import { Switch, Route } from 'react-router-dom';

function App() {

    // const [salesArray, setSalesArray] = useState([])
    // const [productsArray, setProductsArray] = useState([])

    // useEffect(() => {
    //     fetch("/sales")
    //     .then(resp=>resp.json())
    //     .then((data)=>(setSalesArray(data)))

    // }, [])

    // useEffect(() => {
    //     fetch("/products")
    //     .then(resp=>resp.json())
    //     .then((data)=>(setProductsArray(data)))

    // }, [])

    return (
        <div className="App">
            <NavBar />
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
    );
}

export default App;