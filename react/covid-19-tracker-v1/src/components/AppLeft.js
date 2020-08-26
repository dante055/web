import React from 'react';
import Header from './Header';
import Stats from './Stats';
import Maps from './Maps';

export default function AppLeft({
  countries,
  getCountryData,
  countryInfo,
  map,
  mapCountries,
}) {
  return (
    <div className='appLeft'>
      <Header countries={countries} getCountryData={getCountryData} />
      <Stats countryInfo={countryInfo} />
      <Maps countries={mapCountries} map={map} />
    </div>
  );
}
