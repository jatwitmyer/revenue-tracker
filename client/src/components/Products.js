import React, { useEffect, useState } from "react";

function Products() {

    const [productsArray, setProductsArray] = useState([])
    const [featuredProduct, setFeaturedProduct] = useState({})

    // console.log(featuredProduct)
    // console.log(featuredProduct.id)
    // console.log(productsArray)
    
    useEffect(() => {
        fetch("/2/sales_overview/products")
        .then(resp=>resp.json())
        .then((data)=>{
            // console.log(data)
            setProductsArray(data)
            setFeaturedProduct(data[0])
        })
    }, [])

    // // useEffect(() => {
    // //     fetch(`/products/1`)
    // //     .then(resp=>resp.json())
    // //     .then((data)=>console.log(data))
    // // }, [])

    const products = []
    productsArray.forEach(product => {
        const is_in_products = products.some((obj) => (obj.id === product.id)) //check if the products variable has an item in it whose id matches the id of this product
        if (!is_in_products) { //if it does not, add the product to the products array
            products.push(product)
        }
        //if it does, skip it
        }
    )
    // // console.log(products)

    const cards = products.map((product) => {
        // console.log(product)
        return (
           <div className="card">
                <div key={product.id} className="storecontentbox" onClick={() => selectProduct(product)}>
                    <h2 >{product.name}</h2>
                    <p>Serial Number: # {product.serial_number}</p>
                    <button className="cardbuttons" onClick={editProduct}>Edit(Patch)</button>
                    <button className="cardbuttons"onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
            </div>
        )
    })

    function selectProduct(product) {
        console.log("product selected")
        setFeaturedProduct(product)
    }

    function editProduct(e) {
        // console.log("edit selected product")
        // console.log(e.target)
    }

    function deleteProduct(id) {
        console.log("fuck runtime errors to death")
        fetch(`/products/${id}`, {
            method: "DELETE"
        })
        // remove product with given id from products
        window.location.reload(false)
    }

    return (
        <div>
            <div className="rightcolumn">
                <h2 className="this-htag">Product List</h2>
                {cards}
            </div>
            <div className="row">
                <div className="leftcolumn">
                    <div className="card">
                        <h1>Now Viewing: </h1>
                        <h3>Product: # {featuredProduct.serial_number}</h3>
                        <div className="contentbox">
                        <h1 className="this-htag">"{featuredProduct.name}"</h1>
                        <h3>Revenue: </h3>
                        <h3>Sales: </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products 