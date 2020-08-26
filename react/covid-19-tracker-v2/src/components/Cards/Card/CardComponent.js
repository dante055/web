import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import cx from 'classnames';
import React from 'react';
import CountUp from 'react-countup';
import styles from './CardComponent.module.css';

function CardComponent({
  className,
  classNameTodayCount,
  cardTitle,
  value,
  lastUpdate,
  cardSubtitle,
}) {
  const { total, today, active } = value;
  return (
    <Grid
      item
      xs={12}
      md={3}
      component={Card}
      className={cx(styles.cardContent, className)}
    >
      {/* <Grid item xs={12} md={3}>{ */}
      {/* <Card className={cx(styles.cardContent, className)}> */}
      {/* <CardActionArea> */}
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          {cardTitle}
        </Typography>

        <Typography variant='h5'>
          <Typography
            display='inline'
            variant='body2'
            className={styles.cardContent__total}
          >
            Total
          </Typography>
          <CountUp start={0} end={total} duration={2.75} separator=',' />
        </Typography>
        <Typography variant='h4'>
          <Typography
            display='inline'
            variant='body2'
            className={styles.cardContent__today}
          >
            Today
          </Typography>
          <CountUp
            className={classNameTodayCount}
            start={0}
            end={today}
            duration={2.75}
            prefix='+'
            separator=','
          />
        </Typography>
        <Typography variant='h6'>
          {active ? (
            <>
              <Typography
                display='inline'
                variant='body2'
                className={styles.cardContent__active}
              >
                Active
              </Typography>
              <CountUp start={0} end={active} duration={2.75} separator=',' />
            </>
          ) : (
            <br />
          )}
        </Typography>
        <Typography color='textSecondary'>
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant='body2'>{cardSubtitle}</Typography>
      </CardContent>
      {/* </CardActionArea> */}
      {/* </Card> */}
    </Grid>
  );
}

export default CardComponent;
