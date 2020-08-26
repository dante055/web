import React from 'react';
import image from '../../images/header.png';
import styles from './Header.module.css';

function Header() {
  return (
    <div className='header'>
      <img className={styles.header__image} src={image} alt='COVID-19' />
    </div>
  );
}

export default Header;
