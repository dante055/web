import React from 'react';
import '../css/Table.css';
import numeral from 'numeral';

function Table({ countries, getCountryData }) {
  const tableBody = () => {
    return countries.map(({ country, cases, countryInfo }) => {
      const key = countryInfo.iso2 !== null ? countryInfo.iso2 : country;
      return (
        <tr key={key}>
          <td>
            <strong>{numeral(cases).format('0,0')}</strong>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className='table'>
      <header className='table_header'>Live Cases by Country</header>
      <div className='table_table'>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Total Cases</th>
            </tr>
          </thead>
          <tbody>{tableBody()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
