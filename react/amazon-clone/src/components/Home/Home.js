import React from 'react';
import Banner from './Banner/Banner.js';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <Banner />
    </div>
  );
}

export default Home;
