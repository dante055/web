import React from 'react';
import { Grid } from '@material-ui/core';
import CardComponent from './Card/CardComponent';

import styles from './Cards.module.css';

function Card({ countryInfo }) {
  const { cases, recovered, deaths, updated } = countryInfo;
  return (
    <div className={styles.card}>
      <Grid container spacing={3} justify='center'>
        <CardComponent
          className={styles.card__infected}
          classNameTodayCount={styles.card__infectedTodayCount}
          cardTitle='Infected'
          value={cases}
          lastUpdate={updated}
          cardSubtitle='Number of active cases from COVID-19'
        />
        <CardComponent
          className={styles.card__recovered}
          classNameTodayCount={styles.card__recoveredTodayCount}
          cardTitle='Recovered'
          value={recovered}
          lastUpdate={updated}
          cardSubtitle='Number of recoveries from COVID-19.'
        />
        <CardComponent
          className={styles.card__deaths}
          classNameTodayCount={styles.card__DeathsTodayCount}
          cardTitle='Deaths'
          value={deaths}
          lastUpdate={updated}
          cardSubtitle='Number of deaths caused by COVID-19.'
        />
      </Grid>
    </div>
  );
}

export default Card;
