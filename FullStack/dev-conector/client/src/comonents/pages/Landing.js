import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='x-large'>Developer Connector</div>
          <p className='lead'>
            Create developer profile/portfofio share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='signup' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
