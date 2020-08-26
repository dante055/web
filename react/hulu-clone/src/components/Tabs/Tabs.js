import React from 'react';
import styles from './Tabs.module.css';

function Tabs({ genres, selectedTab, setSelectedTab }) {
  return (
    <div className={styles.tabs}>
      {genres.map(({ id, name }) => {
        return (
          <h2
            key={id}
            className={id === selectedTab ? styles['tabs--active'] : null}
            onClick={() => setSelectedTab(id)}
          >
            {name}
          </h2>
        );
      })}
    </div>
  );
}

export default Tabs;
