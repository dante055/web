import React, { useReducer } from 'react';
import InfoBox from './InfoBox';
import '../css/InfoBox.css';

export const ActiveContext = React.createContext();

const initalActive = 'cases';
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return action.value;
    default:
      return state;
  }
};

function Stats({ countryInfo }) {
  const [active, dispach] = useReducer(reducer, initalActive);

  console.log('render', active);

  return (
    <ActiveContext.Provider value={{ active: active, activeDispatch: dispach }}>
      <div className='stats'>
        <InfoBox
          title='Cronovirus Cases'
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
          caseType='cases'
        />
        <InfoBox
          title='Recovered'
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
          caseType='recovered'
        />
        <InfoBox
          title='Deaths'
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}
          caseType='deaths'
        />
      </div>
    </ActiveContext.Provider>
  );
}

export default Stats;
