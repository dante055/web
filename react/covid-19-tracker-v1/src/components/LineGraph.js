import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';
import { buildChartData } from '../utils/utils.js';
import numeral from 'numeral';
import { CaseTypeContext } from '../App';
import '../css/LineGraph.css';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

const chartColor = {
  cases: {
    hex: '#0000FF',
    rgba: 'rgba(0,0,255, 0.5)',
  },
  recovered: {
    hex: '#7dd71d',
    rgba: 'rgba(125, 215, 29, 0.5)',
  },
  deaths: {
    hex: '#CC1034',
    rgba: 'rgba(204, 16, 52, 0.5)',
  },
};

function LineGraph() {
  const [data, setData] = useState({});
  const { casesType } = useContext(CaseTypeContext);

  useEffect(() => {
    Axios.get(
      'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
    ).then(response => {
      let chartData = buildChartData(response.data, casesType);
      setData(chartData);
    });
  }, [casesType]);

  const lineChart = () => {
    return (
      <Line
        data={{
          datasets: [
            {
              backgroundColor: chartColor[casesType].rgba,
              borderColor: chartColor[casesType].hex,
              data: data,
            },
          ],
        }}
        options={options}
        responsive={true}
      />
    );
  };

  return (
    <div className='line'>
      <header className='line_header'>Last 120 Days summary</header>
      <div className='line_graph'>{data?.length > 0 && lineChart()}</div>
    </div>
  );
}

export default LineGraph;
