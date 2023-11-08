import React, { useEffect, useState } from "react";

function Stores() {
    
    const [storesArray, setStoresArray] = useState([])
    const [inventoryByStore, setInventoryByStore] = useState({})
    const [featuredStore, setFeaturedStore] = useState({})

    console.log(featuredStore)

    useEffect(() => {
        fetch("/stores")
        .then(resp=>resp.json())
        .then((data)=>(setStoresArray(data)))
            
    }, [])

    // // useEffect(() => {
    // //     fetch("/1/stores/1") // "http://localhost:3000/<int:company_id>/stores/<int:store_id>"
    // //     .then(resp=>resp.json())
    // //     .then((data)=>(setInventoryByStore(data)))

    // // }, [])
    
    // console.log(storesArray)

    // const cards = storesArray.map((store) => {
    //     console.log(store)
    //     return (
    //         <div className="info-box">
    //             <h2 onClick={selectStore}>{store.name}</h2>
    //             <p>{store.address}</p>
    //             <button onClick={editStore}>Edit(Patch)</button>
    //             <button onClick={deleteStore}>Delete</button>
    //         </div>
    //     )
    // })

    // function selectStore() {
    //     console.log("store selected")
    // }

    // function editStore(e) {
    //     console.log("edit selected")
    //     console.log(e.target) // Hello Jessica, would you like to play a game? -Love, Event Listener
    // }

    // function deleteStore() {
    //     console.log("delete selected")
    // }
    // console.log(featuredStore)

    return (
        <>
            <div>
                {/* {cards} */}
            </div>
            <div className="featured-store">
                <h1>Stores</h1>
                {/* <h2>{featuredStore.name}</h2> */}
                <h3>Revenue: </h3>
                <h3>Net Profit: </h3>
                <h3>Products: </h3>
            </div>
        </>
    )
}

export default Stores 