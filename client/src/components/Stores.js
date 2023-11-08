import React, { useEffect, useState } from "react";

function Stores({storesArray}) {
    
    return (
        <div className="info-box" >
                <h2 className="store-name" >{storesArray[0].name}</h2>
                <p className="store-location" >{storesArray[0].address}</p>
        </div>
    )
}

export default Stores 