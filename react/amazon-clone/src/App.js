import React, { useEffect } from 'react';
import styles from './css/App.module.css';
import {
  Header,
  Home,
  SignIn,
  SignUp,
  Checkout,
  Payment,
  Error,
  Footer,
} from './components/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './utils/firebase.config.js';
import { useStateValue } from './context/StateProvider';

// you can optimize images by resizing and compressing them

function App() {
  const { dispatch } = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        // log in
        dispatch({ type: 'SET_USER', user: authUser });
      } else {
        // log out
        dispatch({ type: 'SET_USER', user: null });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.app_main}>
        <Router>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signin' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/checkout' exact component={Checkout} />
            <Route path='/payment' exact component={Payment} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
