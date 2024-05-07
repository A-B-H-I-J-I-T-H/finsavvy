import React, { useState } from 'react';
import '../styles/DataTable.css'

const DataTable = ({ data }) => {
 
  return (
    <div className='transaction'>
      {/* Period selection dropdown */}
     <p><b>Transaction</b></p>

      {/* Render table with filtered and sorted data */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Date}</td>
              <td>{item.Amount}</td>
              <td>{item.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
