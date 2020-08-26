import React, { useState, useMemo } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';

function Header({ countries, getCountryData }) {
  const [country, setCountry] = useState('WORLDWIDE');

  const createMenuItems = useMemo(() => {
    return countries.map(country => {
      const countryCode = country.code !== null ? country.code : country.name;
      return (
        <MenuItem key={countryCode} value={countryCode}>
          {country.name}
        </MenuItem>
      );
    });
  }, [countries]);

  const onCountryChanged = event => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    getCountryData(countryCode);
  };

  return (
    <div className='header'>
      <h1>COVID 19 Tracker</h1>

      <FormControl>
        <Select variant='outlined' value={country} onChange={onCountryChanged}>
          <MenuItem key='WORLDWIDE' value='WORLDWIDE'>
            WordWide
          </MenuItem>
          {createMenuItems}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
