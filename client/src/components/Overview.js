import React from "react";
import { NavLink } from 'react-router-dom';
import PSSpreadsheet from './PSSpreadsheet';

function Overview() {

    return (
      <div className="overview-columns-container">

        <div className="column-wing">
          <div className="filters"></div>
        </div> 

        <div className="column-center">

          {/* profit summary */}
          <div className="border-gradient blue">
          <div className="profit-summary-container">
            <button className="save-summary-button">Save</button>
            <h1 className="summary-header">Profit Summary</h1>
            <div className="profit-summary-spreadsheet-container">
              <PSSpreadsheet/>
            </div>
          </div>
          </div>

          {/* profitability charts */}
          <div className="border-gradient red">
          <div className="profitability-charts-container">
            <h1 className="summary-header">Most Profitable</h1>
            <div className="most-profitable-columns-container">
              <div className="stores-column">
                <div className="stores-spreadsheet-container"> <></> </div>
              </div>
              <div className="products-column">
                <div className="products-spreadsheet-container"></div>
              </div>
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