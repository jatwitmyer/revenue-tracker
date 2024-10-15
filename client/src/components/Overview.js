import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import PSTable from './PSTable';
import MPTable from './MPTable';

function Overview() {
  const [storesDetailed, setStoresDetailed] = useState([])
  const [orderedStores, setOrderedStores] = useState([])
  const [compProducts, setCompProducts] = useState([])
  const company_id = 1

  function add(accumulator, currentValue) {
    return accumulator + currentValue
  }

  useEffect(() => {
    fetch(`/${company_id}/sales_overview/stores`)
      .then(r => r.json())
      .then(stores => {
        const unorderedStores = []
        for (let i = 0; i < stores.length; i++) {
          const sales = stores[i].sales.map(sale => sale.price - sale.manufacturing_cost)
          const grossProfit = sales.reduce(add)
          const obj = {
            name: stores[i].name,
            grossProfit: grossProfit,
            unitsSold: stores[i].sales.length
          }
          unorderedStores.push(obj)
        }
        const orderedStores = unorderedStores.sort((a, b) => {return b.grossProfit - a.grossProfit})
        setStoresDetailed(stores)
        setOrderedStores(orderedStores)
      })
  }, [])

  console.log(orderedStores)


  useEffect(() => {
    fetch(`/${company_id}/sales_overview/products`)
    .then(r => r.json())
    .then(products => setCompProducts(products))
  }, [])

  // const obj = {
  //   rank: "x",
  //   name: "x",
  //   grossProfit: "x",
  //   unitsSold: "x",
  // }

  // console.log(compStores)
  // console.log(compProducts)

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
                <h2>Stores</h2>
                <MPTable type={"Store"} array={orderedStores}/>
              </div>
            </div>
            <div className="products-column mp-table-container">
              <div className="products-table-container">
                <h2>Products</h2>
                <MPTable type={"Product"} array={compProducts}/>
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