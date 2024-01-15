import React from "react";
import { NavLink } from 'react-router-dom';
import PSTable from './PSTable';
import MPTable from './MPTable';

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
            {/* <button className="save-summary-button blue">Save</button> */}
            <h1 className="summary-header">Profit Summary</h1>
            <div className="profit-summary-table-container">
              <PSTable/>
            </div>
          </div>
          </div>

          {/* profitability charts */}
          <div className="border-gradient blue">
          <div className="profitability-charts-container">
            <h1 className="summary-header">Most Profitable</h1>
            <div className="most-profitable-columns-container">
              <div className="stores-column mp-table-container">
                <div className="stores-table-container">
                  <p>stores</p>
                  <MPTable/>
                </div>
              </div>
              <div className="products-column mp-table-container">
                <div className="products-table-container">
                  <p>products</p>
                  <MPTable/>
                </div>
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