import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

function Dropdown({ services }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={cx(
          styles[`Dropdown__menu`],
          `${click && styles[`Dropdown__menu--active`]}`
        )}
      >
        {services.map((service, index) => {
          return (
            <li key={index} className={styles['Dropdown-item']}>
              <Link
                className={styles[service.cName]}
                to={service.path}
                onClick={() => setClick(false)}
              >
                {service.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
