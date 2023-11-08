import React, { useEffect, useState } from "react";

function Sales() {

    const [salesArray, setSalesArray] = useState([])
    const [productsArray, setProductsArray] = useState([])
    const [viewContent, setViewContent] = useState(<h3>Choose company item to view</h3>)
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
        setViewContent(<ul className="info-box">{populateProducts}</ul>)
    }
    const populateProducts = productsArray.map((product) => {
        return(
            <ul key={product.id} >
                <li>{product.name}</li>
                <li>Manufacturing Cost: {product.manufacturing_cost}</li>
                <li>Serial Number: {product.serial_number}</li>
                <li>Units Sold: {product.sales.length}</li>
            </ul >
        )
    })
    function viewSales(populateSales){
        setViewContent(<ul className="info-box">{populateSales}</ul>)
    }

    const populateSales = salesArray.map((sale) => {
        return(
            <ul key = {sale.confirmation_number}>
                <li>Confirmation Number: {sale.confirmation_number}</li>
                <li>Price: {sale.price}</li>
                <li>Manufacturing Cost: {sale.manufacturing_cost}</li>
                <li>Date: {sale.date_time}</li>
            </ul >
        )
    })

    function viewStores(populateStores){
        setViewContent(<ul className="info-box">{populateStores}</ul>)
    }

    const populateStores = storesArray.map((store) => {
        return(
            <ul key = {store.id}>
                <li>{store.name}</li>
                <li>{store.address}</li>
            </ul >
        )
    })

function Sales() {

    const [salesArray, setSalesArray] = useState([])

    // useEffect(() => {
    //     fetch("/sales")
    //     .then(resp=>resp.json())
    //     .then((data)=>(setSalesArray(data)))

    // }, [])

    return (
    <>
    <div className="sales-sidebar">
        <button>View company revenue</button>
        <button onClick = {() => viewSales(populateSales)}>View all company sales</button>
        <button onClick = {() => viewStores(populateStores)}>View all company stores</button>
        <button onClick = {() => viewProducts(populateProducts)}>View all company products</button>
    </div>
    <div className="sales-container">
        <div className="sales-information-box">
            <h1>Company Name</h1>
            <p>Welcome, employee</p>
            {viewContent}
        </div>
    </div>
    </>
    )
}}

export default Sales