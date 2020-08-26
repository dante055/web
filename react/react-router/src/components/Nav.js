import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <nav>
        <Link to="/">
          <b>Logo</b>
        </Link>
        <ul>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
