import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Sales from "./Sales";
import Products from "./Products";
import Stores from "./Stores";
import { Switch, Route } from 'react-router-dom';

function App() {

    const [salesArray, setSalesArray] = useState([])
    const [storesArray, setStoresArray] = useState([])
    const [productsArray, setProductsArray] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/sales")
        .then(resp=>resp.json())
        .then((data)=>(setSalesArray(data)))

    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/stores")
        .then(resp=>resp.json())
        .then((data)=>(setStoresArray(data)))

    }, [])

    useEffect(() => {
        fetch("http://localhost:3000/products")
        .then(resp=>resp.json())
        .then((data)=>(setProductsArray(data)))

    }, [])

    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route exact path="/sales">
                    <Sales salesArray={salesArray} setSalesArray={setSalesArray} />
                </Route>
                <Route exact path="/stores">
                    <Stores storesArray={storesArray} setStoresArray={setStoresArray} />
                </Route>
                <Route exact path="/products">
                    <Products productsArray={productsArray} setProductsArray={setProductsArray} />
                </Route>
            </Switch>
        </div>
    );
}

export default App;