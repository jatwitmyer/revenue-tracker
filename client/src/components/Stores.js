import React, { useEffect, useState } from "react";

function Stores() {
    
    const [storesArray, setStoresArray] = useState([])
    const [inventoryByStore, setInventoryByStore] = useState({})
    const [featuredStore, setFeaturedStore] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    console.log(featuredStore.sales)
    // console.log(storesArray)
    // console.log(inventoryByStore)

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

    const revenuePerSale = []
    if (featuredStore.sales !== undefined) {
        featuredStore.sales.forEach(sale => {
            revenuePerSale.push(sale.price)
        })
    }
    const featuredStoreRevenue = revenuePerSale.reduce((partialSum, a) => partialSum + a, 0).toFixed(2) //calculate revenue for a store to 2 decimals
    console.log(featuredStoreRevenue)

    const netProfitPerSale = []
    if (featuredStore.sales !== undefined) {
        featuredStore.sales.forEach(sale => {
            netProfitPerSale.push(sale.profit_margin)
        })
    }
    const featuredStoreNetProfit = netProfitPerSale.reduce((partialSum, a) => partialSum + a, 0).toFixed(2) //calculate revenue for a store to 2 decimals
    console.log(featuredStoreNetProfit)

    const cards = storesArray.map((store) => {
        // console.log(store)
        return (
            <div key={store.id} className="info-box" onClick={() => selectStore(store)}>
                <h2>{store.name}</h2>
                <p>{store.address}</p>
                <button onClick={() => setShowForm(!showForm)}>Edit</button>
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

    const [formData, setFormData] = useState({
        name: featuredStore.name,
        address: featuredStore.address
        })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        }

    // PATCH //
    function handleEdit(e) {
        e.preventDefault()
        fetch(`/stores/${featuredStore.id}`, {
            method:"PATCH",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(updatedStore => {
            console.log(updatedStore)
            const updatedStores = storesArray.map(originalStore => {
                if (originalStore.id === updatedStore.id) {
                    return updatedStore
                } else {
                    return originalStore
                }
            })
            setStoresArray(updatedStores)
            setShowForm(!showForm)
        })
    }

    function displayForm() {
        return(
            <>
                <h3> Edit Store </h3>
                <form onSubmit={handleEdit} className="edit-form">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        defaultValue={featuredStore.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        defaultValue={featuredStore.address}
                        onChange={handleChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }

    function displayAddForm() {
        // if (showAddForm)
        return (
            <>
                {/* <h3> Add a Store </h3> */}
                <form onSubmit={handlePost} className="edit-form">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </>
        )
    }

    function handlePost(e) {
        e.preventDefault()
        const newStore = {
            ...formData,
            name: e.target.name.value,
            address: e.target.address.value,
            company_id: 1
        }
        
        fetch('/stores', {
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newStore)
        })
        // .then(resp => resp.json())
        // .then(data => console.log(data))
        setShowAddForm(false)
    }

    return (
        <>
            <div>
                {cards}
            </div>
            <div className="form-div">
                    {showForm ? displayForm() : <></>}
                </div>
            <div>
                <button onClick={() => setShowAddForm(!showAddForm)}>Add A Store</button>
                {showAddForm ? displayAddForm() : <></>}
            </div>
            <div className="featured-store">
                <h1>Stores</h1>
                <h2>{featuredStore.name}</h2>

                <h3>Revenue: ${featuredStoreRevenue}</h3>
                <h3>Net Profit: ${featuredStoreNetProfit}</h3>
                <h3>Products ({inventoryByStore.length}): </h3>
                <ol>
                    {products}
                </ol>
            </div>
        </>
    )
}

export default Stores 