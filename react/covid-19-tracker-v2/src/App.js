import React, { useEffect, useReducer, useState } from 'react';
import {
  Cards,
  Chart,
  CountryPicker,
  Header,
  Footer,
} from './components/index';
import styles from './css/App.module.css';
import { fetchContries, fetchCountryInfo } from './utility/utility';

const initialState = {
  loading: true,
  countries: [],
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESSFULL':
      return {
        loading: false,
        countries: action.countries,
        error: '',
      };
    case 'FETCH_UNSUCCESSFULL':
      return {
        loading: false,
        countries: [],
        error: `${action.error.name} : ${action.error.message}`,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const countries = await fetchContries();
        const countryInfo = await fetchCountryInfo('WORLDWIDE');
        dispatch({ type: 'FETCH_SUCCESSFULL', countries });
        setCountryInfo(countryInfo);
      } catch (error) {
        dispatch({ type: 'FETCH_UNSUCCESSFULL', error });
      }
    })();
  }, []);
  const handleCountryChange = async countryCode => {
    const countryInfo = await fetchCountryInfo(countryCode);
    setCountryInfo(countryInfo);
  };
  return (
    <div className={styles.app}>
      {state.loading || !Object.keys(countryInfo).length ? (
        <h1>Loading...</h1>
      ) : state.error ? (
        <h1>{state.error}</h1>
      ) : (
        <React.Fragment>
          <Header />
          <Cards countryInfo={countryInfo} />
          <CountryPicker
            countries={state.countries}
            handleCountryChange={handleCountryChange}
          />
          <Chart countryInfo={countryInfo} />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
