import React from 'react';
import { Link } from 'react-router-dom';
import useInputHook from '../../hooks/useInputHook';

function Login() {
  const [email, bindEmail, resetEmail] = useInputHook('');
  const [password, bindPassword, resetPassword] = useInputHook('');

  const handleSubmit = e => {
    e.preventDefault();
    if (email && password) console.log('login');
    else {
      console.log('invalid credentials');
    }
  };

  return (
    <>
      <h1 className='large text-primary'>Log In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Sign into your account
      </p>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            {...bindEmail}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            {...bindPassword}
            minLength='8'
            required
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account?
        <Link to='signup'>Sign Up</Link>
      </p>
    </>
  );
}

export default Login;
