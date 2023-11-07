import React, { useEffect, useState } from "react";

function Stores({storesArray}) {
    console.log(storesArray.address)
    return (
        <div className="info-box" >
                <h2 className="store-name" >testing</h2>
                <p className="store-location" >test formatting</p>
        </div>
    )
}

export default Stores 