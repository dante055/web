import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  buildLineChartData,
  fetchtHistoricalData,
} from '../../utility/utility';
import styles from './Chart.module.css';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

function Chart({ countryInfo }) {
  const { country, cases, recovered, deaths, updated } = countryInfo;

  const [lineChartData, setLineChartData] = useState({});
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        console.log('fetch');
        const historicalData = await fetchtHistoricalData(period);
        const lineChartData = buildLineChartData(historicalData);
        setLineChartData(lineChartData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [period]);

  const barChart = () => {
    return (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              lable: 'People',
              backgroundColor: [
                'rgba(0, 0, 255, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(255, 0, 0, 0.5)',
              ],
              data: [cases.total, recovered.total, deaths.total],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    );
  };

  // For line graph
  // labels take and array of x values.
  // data takes a value of y values.
  // ex: in store in (x, y) format
  // labels: lineChartData.cases.map(({ x }) => x),
  // data: lineChartData.cases.map(({ y }) => y),

  const lineChart = () => {
    return (
      <Line
        data={{
          labels: lineChartData.date.map(date => date),
          datasets: [
            {
              label: 'Infected',
              borderColor: 'rgb(0, 0, 255)',
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              fill: true,
              data: lineChartData.cases,
            },
            {
              label: 'Recovered',
              borderColor: 'rgb(0, 255, 0)',
              backgroundColor: 'rgba(0,255,0, 0.5)',
              fill: true,
              data: lineChartData.recovered,
            },
            {
              label: 'Deaths',
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
              data: lineChartData.deaths,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: `Last ${lineChartData.date.length} days data`,
          },
          responsive: true,
        }}
      />
    );
  };

  const handleClick = (e, period) => {
    e.preventDefault();
    setPeriod(period);
  };

  return (
    <div className={styles.chart}>
      {countryInfo.country ? (
        barChart()
      ) : Object.keys(lineChartData).length ? (
        <React.Fragment>
          <Breadcrumbs className={styles.charts__breadcrumb}>
            <Link
              className={styles.charts__breadcrumbLink}
              color='inherit'
              href='#'
              onClick={e => handleClick(e, 'all')}
            >
              All
            </Link>
            <Link
              className={styles.charts__breadcrumbLink}
              color='inherit'
              href='#'
              onClick={e => handleClick(e, '6')}
            >
              Last 5 days
            </Link>
            <Link
              className={styles.charts__breadcrumbLink}
              color='inherit'
              href='#'
              onClick={e => handleClick(e, '11')}
            >
              Last 10 days
            </Link>
            <Link
              className={styles.charts__breadcrumbLink}
              color='inherit'
              href='#'
              onClick={e => handleClick(e, '16')}
            >
              Last 15 days
            </Link>
            <Link
              className={styles.charts__breadcrumbLink}
              color='inherit'
              href='#'
              onClick={e => handleClick(e, '31')}
            >
              Last 30 days
            </Link>
          </Breadcrumbs>
          {lineChart()}
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default Chart;
