import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { MenuItems } from './MenuItems';
import Dropdown from '../Dropdown/Dropdown';
import styles from './NavbarItems.module.css';

function NavbarItems({ closeMobileMenu }) {
  const [dropdown, setDropdown] = useState(false);

  /* for mobile view service dropdown wont show */
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    // if (window.innerWidth < 960) {
    //   setDropdown(false);
    // } else {
    //   setDropdown(false);
    // }
    setDropdown(false);
  };

  return (
    <>
      {MenuItems.map(item => {
        return (
          <>
            {item?.services ? (
              <li
                key={item.title}
                className={styles['NavbarItems']}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <Link
                  to={item.url}
                  className={styles[item.cName]}
                  onClick={closeMobileMenu}
                >
                  {item.title}
                  <i
                    className={cx(
                      styles['NavbarItems-link-servicesIcon'],
                      'fas fa-caret-down'
                    )}
                  />
                </Link>
                {dropdown && <Dropdown services={item.services} />}
              </li>
            ) : (
              <li key={item.title} className={styles['NavbarItems']}>
                <Link
                  to={item.url}
                  className={styles[item.cName]}
                  onClick={closeMobileMenu}
                >
                  {item.title}
                </Link>
              </li>
            )}
          </>
        );
      })}
    </>
  );
}

export default NavbarItems;
