import { Grid } from '@material-ui/core';
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Grid xs={12} item={true}>
        copyright@2020 DANTE
      </Grid>
    </footer>
  );
}

export default Footer;
