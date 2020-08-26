import React from 'react';

function Header({ userName }) {
  return (
    <header>
      <img
        className='logo'
        src='https://lh3.googleusercontent.com/rkBi-WHAI-dzkAIYjGBSMUToUoi6SWKoy9Fu7QybFb6KVOJweb51NNzokTtjod__MzA'
        alt='Messanger'
      />
      <h2>Welcome {userName} !!</h2>
    </header>
  );
}

export default Header;
