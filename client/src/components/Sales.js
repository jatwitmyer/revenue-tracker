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
                <div className="contentbox" key={product.id} >
                    <p>{product.name}</p>
                    <p>Manufacturing Cost: {product.manufacturing_cost}</p>
                    <p>Serial Number: # {product.serial_number}</p>
                    <p>Units Sold: {product.sales.length}</p>
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
                    <p>{store.name}</p>
                    <p>{store.address}</p>
                </div>
            </div>
        )
    })

    return (
    <>
    <div className="rightcolumn">
        <h2 className="this-htag">Company Stats</h2>
        <div className="card">
            <h3 className="contentbox">View company revenue</h3>
        </div>
        <div className="card">
            <h3 className="contentbox" onClick = {() => viewSales(populateSales)}>View all company sales</h3>
        </div>
        <div className="card">
            <h3 className="contentbox" onClick = {() => viewStores(populateStores)}>View all company stores</h3>
        </div>
        <div className="card">
            <h3 className="contentbox" onClick = {() => viewProducts(populateProducts)}>View all company products</h3>
        </div>
        
    </div>
    <div className="row">
        <div className="leftcolumn">
            <div className="card">
                <h2>Company Name</h2>
                <h5>Welcome, employee</h5>
                <div >
                    {viewContent}
                </div>
            </div>
        </div>
    </div>
    </>
    
    )
}

export default Sales