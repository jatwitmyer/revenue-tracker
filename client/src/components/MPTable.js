import React, { useEffect, useState } from "react";

function PSSpreadsheet({type, array}) {
  // const rankedArray = []
  // for (let i = 0; i < array.length; i++) {
    
  // }

  function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));
  
    // Sort each row
    const sortedRows = rows.sort((a, b) => {
      const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
      const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
  
      return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });
  
    // Remove all existing TRs from the table
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
  
    // Re-add the newly sorted rows
    tBody.append(...sortedRows);
  
    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
  }

  function handleSort(e) {
    // console.log(e.target)
    const tableElement = e.target.parentElement.parentElement.parentElement;
		const headerIndex = Array.prototype.indexOf.call(e.target.parentElement.children, e.target);
		const currentIsAscending = e.target.classList.contains("th-sort-asc");

    console.log(tableElement)
    console.log(headerIndex)
    console.log(currentIsAscending)

		sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  }

  return (
  <table className="mp-table searchable sortable">
    <thead>
    <tr>
      <th onClick={(e) => handleSort(e)}>Rank</th>
      <th onClick={(e) => handleSort(e)}>Name</th>
      <th onClick={(e) => handleSort(e)}>Gross Profit</th>
      <th onClick={(e) => handleSort(e)}>Units Sold</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>1.</td>
      <td className="more-details">{type} A</td>
      <td>$500</td>
      <td>10,000</td>
    </tr>
    <tr>
      <td>2.</td>
      <td className="more-details">{type} B</td>
      <td>$200</td>
      <td>4,000</td>
    </tr>
    </tbody>
  </table>
  )}

export default PSSpreadsheet