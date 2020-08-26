import axios from 'axios';

const countryUrl = 'https://covid19.mathdro.id/api/countries';
const wordwideUrl = 'https://disease.sh/v3/covid-19/all';
const historicalDataUrl = 'https://disease.sh/v3/covid-19/historical/all';

export const fetchContries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(countryUrl);
    let modifiedCountries = countries.map(({ name, iso2 }) => ({
      name,
      countryCode: iso2 ? iso2 : name,
    }));
    modifiedCountries = [
      { name: 'Worldwide', countryCode: 'WORLDWIDE' },
      ...modifiedCountries,
    ];
    return modifiedCountries;
  } catch (error) {
    throw error;
  }
};

export const fetchCountryInfo = async countryCode => {
  let fetchUrl;
  if (countryCode === 'WORLDWIDE') {
    fetchUrl = `${wordwideUrl}`;
  } else {
    fetchUrl = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  }

  try {
    const {
      data: {
        country,
        cases,
        todayCases,
        active,
        recovered,
        todayRecovered,
        deaths,
        todayDeaths,
        updated,
      },
    } = await axios.get(fetchUrl);

    return {
      countryCode: countryCode,
      country: country,
      cases: { total: cases, today: todayCases, active: active },
      recovered: { total: recovered, today: todayRecovered },
      deaths: { total: deaths, today: todayDeaths },
      updated,
    };
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

export const fetchtHistoricalData = async period => {
  try {
    const { data } = await axios.get(`${historicalDataUrl}?lastdays=${period}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const buildLineChartData = historicalData => {
  let lineChartData = { cases: [], recovered: [], deaths: [], date: [] };
  Object.keys(historicalData).map((type, index) => {
    let lastDataPoint;
    let dateIndex = 0;
    for (let date in historicalData[type]) {
      if (index === 0 && dateIndex !== 0) {
        lineChartData.date.push(date);
      }
      if (lastDataPoint) {
        lineChartData[type].push(historicalData[type][date] - lastDataPoint);
      }
      lastDataPoint = historicalData[type][date];
      dateIndex++;
    }
  });
  return lineChartData;
};

/* export const buildLineChartData = historicalData => {
  let lineChartData = { cases: [], recovered: [], deaths: [], date: [] };
if (historicalData.hasOwnProperty('cases')) {
  for (let date in historicalData.cases) {
    lineChartData.date.push(date);
  }
}
Object.keys(historicalData).map(type => {
  let lastDataPoint;
  let chartData = [];
  for (let date in historicalData[type]) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: historicalData[type][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = historicalData[type][date];
  }
  lineChartData[type] = chartData;
});
  return lineChartData;
}; */
