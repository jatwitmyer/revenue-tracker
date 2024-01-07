import React from "react";
import { NavLink } from 'react-router-dom';

function Overview() {

    return (
      <div className="overview-columns-container">
        <div className="column-wing">
          <div className="filters"></div>
        </div>
        <div className="column-center">
          <div className="profit-summary-container">
            <h1 className="summary-header">Profit Summary</h1>
            <button>Save</button>
            <div className="profit-summary-spreadsheet-container"></div>
          </div>
          <div className="most-profitable-container">
            <h1 className="summary-header">Most Profitable</h1>
            <div className="most-profitable-columns-container">
              <div className="stores-column">
                <div className="stores-spreadsheet-container"></div>
              </div>
              <div className="products-column">
                <div className="products-spreadsheet-container"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="column-wing">

        </div>
      </div>
    )
}

export default Overview