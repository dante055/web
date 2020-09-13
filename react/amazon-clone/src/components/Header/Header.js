import cx from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/amazon_logo.png';
import logo_black from '../../images/amazon_logo_black.png';
import {
  ArrowDropDownIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBasketIcon,
} from './icons.js';
import styles from './Header.module.css';

import { useStateValue } from '../../context/StateProvider';
import { auth } from '../../utils/firebase.config';

function Header() {
  const { pathname } = useLocation();
  const {
    cart: { totalCartItems },
    user,
  } = useStateValue();
  // const {
  //   cart: { basket, totalCartItems },
  // } = useStateValue();
  // console.log(basket, totalCartItems);

  const signOut = () => {
    if (user) {
      console.log('signout');
      auth.signOut();
    }
  };

  return (
    <>
      {pathname === '/' || pathname === '/checkout' ? (
        <nav className={styles.header}>
          <div className={styles.header_navLeft}>
            <MenuIcon className={styles.header_menu} />
            <Link to='/' className={styles.header_logo}>
              <img
                className={styles.header_logo_link}
                src={logo}
                alt='amazon'
              />
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
            <Link to={!user && '/signin'} className={styles.header_link}>
              <div onClick={signOut} className={styles.header_navOptions}>
                <span className={styles.header_lineOne}>
                  {user ? `hello, ${user.email}` : 'hello'}
                </span>

                <span className={styles.header_lineTwo}>
                  {user ? 'sign out' : 'sign in'}
                </span>
              </div>
            </Link>
            <Link to='notCreated' className={styles.header_link}>
              <div className={styles.header_navOptions}>
                <span className={styles.header_lineOne}>Returns</span>
                <span className={styles.header_lineTwo}>& Orders</span>
              </div>
            </Link>
            <Link to='notCreated' className={styles.header_link}>
              <div className={styles.header_navOptions}>
                <span className={styles.header_lineOne}>Your</span>
                <span className={styles.header_lineTwo}>Prime</span>
              </div>
            </Link>

            <Link to='/checkout' className={styles.header_link}>
              <div className={styles.header_navOptionsNasket}>
                <ShoppingBasketIcon />
                <span
                  className={cx(
                    styles.header_lineTwo,
                    styles.header_basketCount
                  )}
                >
                  {totalCartItems}
                </span>
              </div>
            </Link>
          </div>
        </nav>
      ) : (
        <Link to='/' className={styles.header_logo2}>
          <img
            className={styles.header_logo2_link}
            src={logo_black}
            alt='amazon'
          />
        </Link>
      )}
    </>
  );
}

export default Header;
