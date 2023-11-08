import React, { useEffect, useState } from "react";

function Stores() {
    
    const [storesArray, setStoresArray] = useState([])
    const [inventoryByStore, setInventoryByStore] = useState({})
    const [featuredStore, setFeaturedStore] = useState({})
    const [storeId, setStoreId] = useState(0)
    
    console.log(featuredStore)
    console.log(storesArray)
    console.log(inventoryByStore)
    console.log(storeId)

    const company_id = 1
    useEffect(() => {
        fetch(`${company_id}/sales_overview/stores`)
        .then(resp=>resp.json())
        .then((data)=>(setStoresArray(data)))
            
    }, [])

    useEffect(() => {
        fetch(`${company_id}/stores/${storeId}`)
        .then(resp=>resp.json())
        .then((data)=>(setInventoryByStore(data)))

    }, [])

    const cards = storesArray.map((store) => {
        console.log(store)
        return (
            <div key={store.id} className="info-box">
                <h2 onClick={selectStore}>{store.name}</h2>
                <p>{store.address}</p>
                <button onClick={editStore}>Edit(Patch)</button>
                <button onClick={deleteStore}>Delete</button>
            </div>
        )
    })

    function selectStore() {
        console.log("store selected")
    }

    function editStore(e) {
        console.log("edit selected")
        console.log(e.target) // Hello Jessica, would you like to play a game? -Love, Event Listener
    }

    function deleteStore() {
        console.log("delete selected")
    }

    return (
        <>
            <div>
                {cards}
            </div>
            <div className="featured-store">
                <h1>Stores</h1>
                <h2>Store Name: </h2>
                <h3>Revenue: </h3>
                <h3>Net Profit: </h3>
                <h3>Products: </h3>
            </div>
        </>
    )
}

export default Stores 