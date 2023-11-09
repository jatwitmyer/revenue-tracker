import React, { useEffect, useState } from "react";

function Sales() {

    const [salesArray, setSalesArray] = useState([])
    const [productsArray, setProductsArray] = useState([])
    const [viewContent, setViewContent] = useState(
    <div className="card">
        <h3 className="this-htag">Choose company item to view</h3>
    </div>
    )
    const [storesArray, setStoresArray] = useState([])

    useEffect(() => {
        fetch("/sales")
        .then(resp=>resp.json())
        .then((data)=>(setSalesArray(data)))

    }, [])

    useEffect(() => {
        fetch("/products")
        .then(resp=>resp.json())
        .then((data)=>(setProductsArray(data)))

    }, [])

    const company_id = 1
    useEffect(() => {
        fetch("/stores")
        .then(resp=>resp.json())
        .then((data)=>(setStoresArray(data)))
    }, [])

    console.log(productsArray)
    console.log(salesArray)

    function viewProducts(populateProducts){
        setViewContent(<div className="card">{populateProducts}</div>)
    }
    const populateProducts = productsArray.map((product) => {
        return(
            <div className="card">
                <div className="prod-contentbox" key={product.id} >
                    <li>Product name: {product.name}</li>
                    <ul>
                        <li>Manufacturing Cost: ${product.manufacturing_cost}</li>
                        <li>Serial Number: # {product.serial_number}</li>
                        <li>Units Sold: {product.sales.length}</li>
                    </ul>
                </div >
            </div>
        )
    })
    function viewSales(populateSales){
        setViewContent(<div className="card">{populateSales}</div>)
    }

    const populateSales = salesArray.map((sale) => {
        return(
            <div className="card">
                <div className="contentbox" key = {sale.confirmation_number}>
                    <p>Confirmation Number: {sale.confirmation_number}</p>
                    <p>Price: {sale.price}</p>
                    <p>Manufacturing Cost: {sale.manufacturing_cost}</p>
                    <p>Date: {sale.date_time}</p>
                </div >
            </div>
        )
    })

    function viewStores(populateStores){
        setViewContent(<div className="card">{populateStores}</div>)
    }

    const populateStores = storesArray.map((store) => {
        return(
            <div className="card">
                <div className="contentbox" key = {store.id}>
                    <h3>"{store.name}"</h3>
                    <p>Location: {store.address}</p>
                </div>
            </div>
        )
    })

    function viewRevenue(populateRevenue){
        setViewContent(<div className="card">{populateRevenue}</div>)
    }

    const populateRevenue = 
            <div className="card">
                <div className="contentbox"> 
                    <h3>Nothing to see here..</h3>
                    <img src="https://i.ibb.co/FJWCc3f/Screenshot-2023-11-09-113224.png" alt="Screenshot-2023-11-09-113224" border="0"></img>
                </div>
            </div>
        
    

    return (
    <>
    <div className="rightcolumn">
        <h2>Overview: </h2>
        <div className="scrollable-content">
            <div className="card">
                <h3 className="contentbox" onClick = {() => viewSales(populateSales)}>View all company sales</h3>
            </div>
            <div className="card">
                <h3 className="contentbox" onClick = {() => viewStores(populateStores)}>View all company stores</h3>
            </div>
            <div className="card">
                <h3 className="contentbox" onClick = {() => viewProducts(populateProducts)}>View all company products</h3>
            </div>
            <div className="card">
                <h3 className="contentbox" onClick = {() => viewRevenue(populateRevenue)}>View company revenue</h3>
            </div>
        </div>
        
    </div>
    <div className="row">
        <div className="leftcolumn">
            <div className="card">
                <h2>Company Name: Bell, Wallace and Martinez</h2>
                <h5>Welcome, employee</h5>
                    <div className="scrollable-content">
                    <ol >
                        {viewContent}
                    </ol>
                </div>
            </div>
        </div>
    </div>
    </>
    
    )
}

export default Sales