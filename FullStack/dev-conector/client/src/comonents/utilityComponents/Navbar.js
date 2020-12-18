import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <a href='dashboard.html'>
          <i className='fas fas-code'></i>
          DevConnector
        </a>
      </h1>
      <ul>
        <li>
          <Link to='profiles'>Developers</Link>
        </li>
        <li>
          <Link to='signup'>Register</Link>
        </li>
        <li>
          <Link to='login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
