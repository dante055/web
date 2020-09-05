import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/amazon_logo.png';
import {
  ArrowDropDownIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBasketIcon,
} from './icons.js';
import styles from './Header.module.css';

function Header() {
  return (
    <nav className={styles.header}>
      <div className={styles.header_navLeft}>
        <MenuIcon className={styles.header_menu} />
        <Link to='/' className={styles.header_logo}>
          <img className={styles.header_logo_link} src={logo} alt='amazon' />
        </Link>
      </div>
      <div className={styles.header_navCenter}>
        <button className={styles.header_searchDropDown}>
          <span>All</span>
          <ArrowDropDownIcon />
        </button>
        <input className={styles.header_searchInput} type='text' />
        <SearchIcon className={styles.header_searchIcon} />
      </div>
      <div className={styles.header_navRight}>
        <Link to='/signin' className={styles.header_link}>
          <div className={styles.header_navOptions}>
            <span className={styles.header_lineOne}>hello</span>
            <span className={styles.header_lineTwo}>sign in</span>
          </div>
        </Link>
        <Link className={styles.header_link}>
          <div className={styles.header_navOptions}>
            <span className={styles.header_lineOne}>Returns</span>
            <span className={styles.header_lineTwo}>& Orders</span>
          </div>
        </Link>
        <Link className={styles.header_link}>
          <div className={styles.header_navOptions}>
            <span className={styles.header_lineOne}>Your</span>
            <span className={styles.header_lineTwo}>Prime</span>
          </div>
        </Link>

        <Link to='/basket' className={styles.header_link}>
          <div className={styles.header_navOptionsNasket}>
            <ShoppingBasketIcon />
            <span
              className={cx(styles.header_lineTwo, styles.header_basketCount)}
            >
              0
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
