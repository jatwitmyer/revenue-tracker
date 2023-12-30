import React, { useEffect, useState } from "react";

function Stores() {
    
    const [storesArray, setStoresArray] = useState([])
    const [inventoryByStore, setInventoryByStore] = useState({})
    const [featuredStore, setFeaturedStore] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    // console.log(featuredStore.sales)
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
    // console.log(featuredStoreRevenue)

    const netProfitPerSale = []
    if (featuredStore.sales !== undefined) {
        featuredStore.sales.forEach(sale => {
            netProfitPerSale.push(sale.profit_margin)
        })
    }
    const featuredStoreNetProfit = netProfitPerSale.reduce((partialSum, a) => partialSum + a, 0).toFixed(2) //calculate revenue for a store to 2 decimals
    // console.log(featuredStoreNetProfit)

    function createCards() {
        const cards = storesArray.map((store) => {
            // console.log(store)
            return (
                <div key={store.id} className="card" onClick={() => selectStore(store)}>
                    <div className="storecontentbox">
                        <h2>{store.name}</h2>
                        <p>{store.address}</p>
                        <button className="cardbuttons" onClick={() => editStore(store)}>Edit</button>
                        <button className="cardbuttons" onClick={() => deleteStore(store)}>Delete</button>
                    </div>
                </div>
            )
        })
        return cards
    }


    function selectStore(store) {
        console.log("store selected")
        setFeaturedStore(store)
    }

    function addStore() {
        setShowAddForm(true)
        setFormData({
            name: "",
            address: ""
        })
    }

    function editStore(store) {
        console.log("edit selected")
        console.log("store", store)
        setShowForm(true)
        setFormData({
            name: store.name,
            address: store.address
            })
        
    }

    function deleteStore(store) {
        console.log(store.id)
        fetch(`/stores/${store.id}`, {
            method: "DELETE"
        })
        const updatedStores = []
        storesArray.forEach(item => {
            if (item.id !== store.id) {
                updatedStores.push(item)
            }
        })
        setStoresArray(updatedStores)
    }

    let products = <li></li>
    if (inventoryByStore[0] !== undefined){
        products = inventoryByStore.map((inventory_item) => {
            return (
                <div className="card" key={inventory_item.id}>
                    <div className="prod-contentbox">
                        <li key={inventory_item.id}><strong>Product name:</strong> {inventory_item.product.name}
                        </li>
                            <ul>
                                <li><strong>Price:</strong> ${inventory_item.price}</li>
                                <li><strong>Manufacturing Cost:</strong> ${inventory_item.product.manufacturing_cost}</li>
                                <li><strong>Serial Number:</strong> # {inventory_item.product.serial_number}</li>
                            </ul>
                    </div>
                </div>
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
        console.log(featuredStore)
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
            setShowForm(false)
        })
    }

    function displayForm() {
        return(
            <div className="card">
                <h3> Edit Store </h3>
                <form onSubmit={handleEdit} className="edit-form">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        defaultValue={featuredStore.name}
                        onChange={handleChange}
                        className="input-text"
                    />
                    <br/>
                    <label htmlFor="address">Address: </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        defaultValue={featuredStore.address}
                        onChange={handleChange}
                        className="input-text"
                    />
                    <br/>
                    <br/>
                    <input className="buttons" type="submit" value="Submit"/>
                    <input className="buttons" type="button" value="Cancel" onClick={() => setShowForm(false)}/>
                </form>
            </div>
        )
    }

    function displayAddForm() {
        // if (showAddForm)
        return (
            <div className="card">
                <h3>Submit new store information: </h3>
                <form onSubmit={handlePost} className="edit-form">
                    <label htmlFor="name">Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        defaultValue={""}
                        onChange={handleChange}
                        className="input-text"
                    />
                    <br/>
                    <label htmlFor="address">Address:
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        defaultValue={""}
                        onChange={handleChange}
                        className="input-text"
                    />
                    <br/>
                    <br/>
                    <input className="buttons" type="submit" value="Submit" />
                    <input className="buttons" type="button" value="Cancel" onClick={() => setShowAddForm(false)}/>
                </form>
            </div>
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
        .then(resp => resp.json())
        .then(newStore => {
            console.log(newStore)
            const updatedStores = [...storesArray, newStore]
            setStoresArray(updatedStores)
        })
        setShowAddForm(false)
    }

    return (
        <>  
            <div>
                <div className="rightcolumn">
                    <div className="form-div">
                            {showForm === true ? displayForm() : <></>}
                        </div>
                    <div>
                        <button className="addbutton" onClick={addStore}>Register a New Store</button>
                        {showAddForm === true ? displayAddForm() : <></>}
                    </div>
                    {createCards()}
                </div>
            </div>
            <div className="row">
                <div className="leftcolumn">
                    <div className="card details">
                        <h1>Now Viewing:</h1>
                        <h2>{featuredStore.name}</h2>
                        <p>{featuredStore.address}</p>
                        <div className="contentbox">
                            <h3>Revenue: ${featuredStoreRevenue}</h3>
                            <h3>Net Profit: {Math.sign(featuredStoreNetProfit) === -1 ? "-$" + Math.abs(featuredStoreNetProfit) : "$" + featuredStoreNetProfit}</h3>
                        </div>
                            <h3>Products ({inventoryByStore.length}): </h3>
                            <div className="scrollable-content">
                                <ol>
                                    {products}
                                </ol>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stores 