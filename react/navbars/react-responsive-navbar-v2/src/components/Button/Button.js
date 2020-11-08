import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

function Button({ cName }) {
  return (
    <Link to='sign-up'>
      <button className={cx(cName, styles['btn'])}>Sign Up</button>
    </Link>
  );
}

export default Button;
