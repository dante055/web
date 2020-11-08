import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import NavbarItems from './NavbarItems/NavbarItems';
import Button from '../Button/Button';
import styles from './Navbar.module.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  return (
    <>
      <nav className={styles['Navbar']}>
        <Link to='/' className={styles['Navbar__logo']}>
          EPIC
          <i class={cx(styles['Navbar__logo-icon'], 'fab fa-firstdraft')} />
        </Link>
        <div className={styles['Navbar__menuIcon']}>
          <i
            className={cx(
              styles[`Navbar__menuIcon-icon`],
              `fas ${click ? 'fa-times' : 'fa-bars'}`
            )}
            onClick={handleClick}
          ></i>
        </div>
        <ul
          className={cx(
            styles[`Navbar__menu`],
            `${click && styles[`Navbar__menu--active`]}`
          )}
        >
          <NavbarItems closeMobileMenu={closeMobileMenu} />
        </ul>
        <Button cName={styles['Navbar__button']} />
      </nav>
    </>
  );
}

export default Navbar;
