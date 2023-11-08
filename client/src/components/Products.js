import React, { useEffect, useState } from "react";

function Products() {

    const [productsArray, setProductsArray] = useState([])
    const [inventoryByProduct, setInventoryByProduct] = useState({})
    const [featuredProduct, setFeaturedProduct] = useState({})

    // console.log(featuredProduct.id)
    console.log(productsArray)
    // console.log(inventoryByProduct)
    
    const company_id = 1
    useEffect(() => {
        fetch(`/products`)
        .then(resp=>resp.json())
        .then((data)=>{
            console.log(data)
            setProductsArray(data)
            setFeaturedProduct(data[0])
        })
    }, [])

    // useEffect(() => {
    //     fetch(`${company_id}/products/${featuredProduct.id}`)
    //     .then(resp=>resp.json())
    //     .then((data)=>(setInventoryByProduct(data)))
    // }, [featuredProduct])

    const products = productsArray.filter((product) => {
        
    })

    const cards = productsArray.map((product) => {
        // console.log(product)
        return (
            <div key={product.id} className="info-box">
                <h2 onClick={() => selectProduct(product)}>{product.name}</h2>
                <p>{product.serial_number}</p>
                <button onClick={editProduct}>Edit(Patch)</button>
                <button onClick={deleteProduct}>Delete</button>
            </div>
        )
    })

    function selectProduct(product) {
        console.log("product selected")
        setFeaturedProduct(product)
    }

    function editProduct(e) {
        console.log("edit selected product")
        // console.log(e.target)
    }

    function deleteProduct() {
        console.log("delete selected")
    }

    // let products = <li></li>
    // if (inventoryByStore[0] !== undefined){
    //     products = inventoryByStore.map((inventory_item) => {
    //         return (
    //             <li key={inventory_item.id}><span className="products-subheader">Product name:</span> {inventory_item.product.name}
    //                 <ul>
    //                     <li>Price: ${inventory_item.price}</li>
    //                     <li>Manufacturing Cost: ${inventory_item.product.manufacturing_cost}</li>
    //                     <li>Serial Number: {inventory_item.product.serial_number}</li>
    //                 </ul>
    //             </li>
    //         )
    //     })}

    return (
        <>
            <div>
                {/* {cards} */}
            </div>
            <div className="featured-product">
                <h1>Product</h1>
                <h2>{featuredProduct.name}</h2>
                <h3>Revenue: </h3>
                <h3>Net Profit: </h3>
            </div>
        </>
    )
}

export default Products 