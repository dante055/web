import React from 'react';
import cx from 'classnames';
import logo from '../../images/hulu-white.png';
import {
  HomeIcon,
  FlashOnIcon,
  LiveTvIcon,
  VideoLibraryIcon,
  SearchIcon,
  PersonOutlineIcon,
} from './icons';
// import {Home, FlashOn, LiveTv, VideoLibrary, Search, PersonOutline, } from '@material-ui/icons';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__icons}>
        <div
          className={cx(styles.header__icon, styles['header__icon--active'])}
        >
          <HomeIcon className={styles.header__svgIcon} />
          <p>Home</p>
        </div>
        <div className={styles.header__icon}>
          <FlashOnIcon className={styles.header__svgIcon} />
          <p>Trending</p>
        </div>
        <div className={styles.header__icon}>
          <LiveTvIcon className={styles.header__svgIcon} />
          <p>Verified</p>
        </div>
        <div className={styles.header__icon}>
          <VideoLibraryIcon className={styles.header__svgIcon} />
          <p>Collections</p>
        </div>
        <div className={styles.header__icon}>
          <SearchIcon className={styles.header__svgIcon} />
          <p>Search</p>
        </div>
        <div className={styles.header__icon}>
          <PersonOutlineIcon className={styles.header__svgIcon} />
          <p>Account</p>
        </div>
      </div>
      {/* <img src={require('../../images/hulu-white.png')} alt='hulu' /> */}
      <img className={styles.header__image} src={logo} alt='hulu' />
    </div>
  );
}

export default Header;
