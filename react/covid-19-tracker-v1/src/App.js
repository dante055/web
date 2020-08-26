import Axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import AppLeft from './components/AppLeft';
import AppRight from './components/AppRight';
import './css/App.css';
import { sortData } from './utils/utils.js';

export const CaseTypeContext = React.createContext();

const initialState = {
  loading: true,
  countries: [],
  tableData: [],
  mapCountries: [],
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESSFULL':
      return {
        loading: false,
        countries: action.payload,
        tableData: action.tableData,
        mapCountries: action.data,
        error: '',
      };
    case 'FETCH_UNSUCCESSFULL':
      return {
        loading: false,
        countries: [],
        tableData: [],
        mapCountries: [],
        error: `${action.error.name} : ${action.error.message}`,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// initial center some whare in pacific ocean
// for much zoom
const mapWordwide = {
  center: {
    lat: 34.80746,
    lng: -40.4796,
  },
  zoom: 3,
};

const initialCaseType = 'cases';
const caseTypeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CASETYPE':
      return action.value;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [casesType, caseTypeDispatch] = useReducer(
    caseTypeReducer,
    initialCaseType
  );
  const [countryInfo, setCountryInfo] = useState({});
  const [map, setMap] = useState(mapWordwide);

  useEffect(() => {
    Axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => response.data)
      .then(data => {
        const countries = data.map(country => ({
          name: country.country,
          code: country.countryInfo.iso2,
        }));
        const sortedData = sortData(data);
        dispatch({
          type: 'FETCH_SUCCESSFULL',
          payload: countries,
          tableData: sortedData,
          data: data,
        });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_UNSUCCESSFULL', error: err });
      });

    // const fetchData = async () => {
    //   const response = await Axios.get(
    //     'https://disease.sh/v3/covid-19/countries'
    //   ).catch(err => {
    //     dispatch({ type: 'FETCH_UNSUCCESSFULL', error: err });
    //   });
    //   const countries = await response.data.map(country => ({
    //     name: country.country,
    //     code: country.countryInfo.iso2,
    //   }));
    //   dispatch({ type: 'FETCH_SUCCESSFULL', payload: countries });
    // };
    // fetchData();

    getCountryData('WORLDWIDE');
  }, []);

  const getCountryData = async code => {
    const url =
      code === 'WORLDWIDE'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${code}`;

    Axios.get(url)
      .then(response => response.data)
      .then(data => {
        setCountryInfo(data);
        if (code === 'WORLDWIDE') {
          setMap(mapWordwide);
        } else {
          // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMap({
            center: {
              lat: data.countryInfo.lat,
              lng: data.countryInfo.long,
            },
            zoom: 4,
          });
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='app'>
      {state.loading ? (
        'Loading...'
      ) : state.error ? (
        state.error
      ) : (
        <CaseTypeContext.Provider
          value={{ casesType: casesType, caseTypeDispatch: caseTypeDispatch }}
        >
          <AppLeft
            countries={state.countries}
            getCountryData={getCountryData}
            countryInfo={countryInfo}
            casesType={casesType}
            map={map}
            mapCountries={state.mapCountries}
          />
          <AppRight
            tableData={state.tableData}
            getCountryData={getCountryData}
          />
        </CaseTypeContext.Provider>
      )}
    </div>
  );
}

export default App;
