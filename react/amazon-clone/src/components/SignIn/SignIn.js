import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { Link, useHistory } from 'react-router-dom';

import { auth } from '../../utils/firebase.config';

/* 
  singIn steps:

  -> creste firebase app
  -> set up he firebase config file in the app (/utils/firebse)
  -> to to autentication and enable email/password in the signin methods
*/

function SignIn() {
  const history = useHistory();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleInput = event => {
    event.persist();
    // const { name, value } = event.target;
    setInput(prevState => ({
      ...prevState,
      // [name]: value,
      [event.target.name]: event.target.value,
    }));
  };

  const userSignIn = async event => {
    console.log('sign');
    event.preventDefault();
    const { email, password } = input;
    try {
      await auth.signInWithEmailAndPassword(email, password);

      // then user is signin redirect to homepage
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async event => {
    console.log('sign');
    event.preventDefault();
    const { email, password } = input;
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      // then user is signin and redirect to homepage
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.signIn}>
      <div className={styles.signIn_container}>
        <h1>Login</h1>
        <form className={styles.signIn_form}>
          <div className={styles.signIn_email}>
            <span>E-mail</span>
            <input
              type='email'
              value={input.email}
              name='email'
              onChange={handleInput}
              required
            />
          </div>
          <div className={styles.signIn_password}>
            <span>Password</span>
            <input
              type='password'
              value={input.password}
              name='password'
              onChange={handleInput}
              required
            />
          </div>
          <div className={styles.signIn_button}>
            <button type='submit' onClick={userSignIn}>
              Sign In
            </button>
          </div>
          <div className={styles.signIn_policy}>
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </div>
        </form>
        <div className={styles.signIn_createAccount}>
          <span>New to Amazon?</span>
          <button
            type='submit'
            className={styles.signIn_createAccountButton}
            onClick={registerUser}
          >
            Create your Account
          </button>
          {/* <Link to='/signup'>
            <button className={styles.signIn_createAccountButton}>
              Create your Account
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
