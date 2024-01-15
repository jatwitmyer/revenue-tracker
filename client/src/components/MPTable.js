import React from "react";

function PSSpreadsheet() {
  // profit summary spreadsheet
  // https://www.youtube.com/watch?v=8SL_hM1a0yo&ab_channel=dcode

  return (
  <table className="mp-table searchable sortable">
    <thead>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Gross Profit</th>
      <th>Units Sold</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>1.</td>
      <td className="more-details">Store A</td>
      <td>$500</td>
      <td>10,000</td>
    </tr>
    <tr>
      <td>2.</td>
      <td className="more-details">Store B</td>
      <td>$200</td>
      <td>4,000</td>
    </tr>
    </tbody>
  </table>
  )}

export default PSSpreadsheet