import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { MenuItems } from './MenuItems';
import './Navbar.css';

function Navbar() {
  const [clicked, setClicked] = useState(false);

  const Links = () => {
    return MenuItems.map(item => {
      return (
        <li key={item.title}>
          <a className={item.cName} href={item.url}>
            {item.title}
          </a>
        </li>
      );
    });
  };

  return (
    <nav className='Navbar'>
      <h1 className='Navbar__logo'>
        React
        <i className='Navbar__logo-icon fab fa-react'></i>
      </h1>
      <div className='Navbar__menuIcon'>
        <i
          className={`Navbar__menuIcon-icon
            fas ${clicked ? 'fa-times' : 'fa-bars'}`}
          onClick={() => setClicked(!clicked)}
        ></i>
      </div>
      <ul className={`Navbar__menu ${clicked && 'Navbar__menu--active'}`}>
        {Links()}
      </ul>
      <Button className='Navbar__button'>Sign Up</Button>
    </nav>
  );
}

export default Navbar;
