import React, { useEffect, useState } from "react";

function Stores() {
    
    const [storesArray, setStoresArray] = useState([])
    const [inventoryByStore, setInventoryByStore] = useState({})
    const [featuredStore, setFeaturedStore] = useState({})

    
    console.log(featuredStore.id)
    // console.log(storesArray)
    console.log(inventoryByStore)

    const company_id = 1
    useEffect(() => {
        fetch(`${company_id}/sales_overview/stores`)
        .then(resp=>resp.json())
        .then((data)=>{
            setStoresArray(data)
            setFeaturedStore(data[0])
        })
    }, [])

    useEffect(() => {
        fetch(`${company_id}/stores/${featuredStore.id}`)
        .then(resp=>resp.json())
        .then((data)=>(setInventoryByStore(data)))
    }, [featuredStore])

    const cards = storesArray.map((store) => {
        // console.log(store)
        return (
            <div key={store.id} className="info-box">
                <h2 onClick={() => selectStore(store)}>{store.name}</h2>
                <p>{store.address}</p>
                <button onClick={editStore}>Edit(Patch)</button>
                <button onClick={deleteStore}>Delete</button>
            </div>
        )
    })

    function selectStore(store) {
        console.log("store selected")
        setFeaturedStore(store)
    }

    function editStore(e) {
        console.log("edit selected")
        console.log(e.target) // Hello Jessica, would you like to play a game? -Love, Event Listener
    }

    function deleteStore() {
        console.log("delete selected")
    }

    let products = <li></li>
    if (inventoryByStore[0] !== undefined){
        products = inventoryByStore.map((inventory_item) => {
            return (
                <li key={inventory_item.id}><span className="products-subheader">Product name:</span> {inventory_item.product.name}
                    <ul>
                        <li>Price: ${inventory_item.price}</li>
                        <li>Manufacturing Cost: ${inventory_item.product.manufacturing_cost}</li>
                        <li>Serial Number: {inventory_item.product.serial_number}</li>
                    </ul>
                </li>
            )
        })}

    return (
        <>
            <div>
                {cards}
            </div>
            <div className="featured-store">
                <h1>Stores</h1>
                <h2>{featuredStore.name}</h2>
                <h3>Revenue: </h3>
                <h3>Net Profit: </h3>
                <h3>Products: ({inventoryByStore.length}) </h3>
                <ol>
                    {products}
                </ol>
            </div>
        </>
    )
}

export default Stores 