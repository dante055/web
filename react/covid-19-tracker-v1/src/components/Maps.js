import React, { useContext } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/Map.css';
import ShowDataOnMap from './ShowDataOnMap';
import { CaseTypeContext } from '../App';

function Maps({ countries, map }) {
  const { casesType } = useContext(CaseTypeContext);

  return (
    <div className='maps'>
      <header className='maps__header'> Map </header>
      <div className='map__leaflet'>
        <LeafletMap center={map.center} zoom={map.zoom}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ShowDataOnMap countries={countries} casesType={casesType} />
        </LeafletMap>
      </div>
    </div>
  );
}

export default Maps;
