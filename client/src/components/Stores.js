import React, { useEffect, useState } from "react";

function Stores({storesArray}) {
    
    const storeName = storesArray.filter((store) => {
        console.log(store)
    })

    return (
        <div className="info-box" >
                <h2 className="store-name" >{storeName}</h2>
                <p className="store-location" >{storesArray[0].address}</p>
        </div>
    )
}

export default Stores 