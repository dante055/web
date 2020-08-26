import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#0000FF',
    rgba: 'rgba(0,0,255, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgba: 'rgba(125, 215, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#CC1034',
    rgba: 'rgba(204, 16, 52, 0.5)',

    multiplier: 2000,
  },
};

function ShowDataOnMap({ countries, casesType }) {
  return countries.map(country => {
    const key =
      country.countryInfo.iso2 !== null
        ? country.countryInfo.iso2
        : country.country;
    return (
      <Circle
        key={key}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className='showDataOnMap__container'>
            <div
              className='showDataOnMap__flag'
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className='showDataOnMap__name'>{country.country}</div>
            <div className='showDataOnMap__confirmed'>
              Cases: {numeral(country.cases).format('0.0a')}
            </div>
            <div className='showDataOnMap__recovered'>
              Recovered: {numeral(country.recovered).format('0.0a')}
            </div>
            <div className='showDataOnMap__deaths'>
              Deaths: {numeral(country.deaths).format('0.0a')}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });
}

export default ShowDataOnMap;
