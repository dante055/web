import React from 'react';
import styles from './css/App.module.css';
import {
  Header,
  Home,
  SignIn,
  SignUp,
  Checkout,
  Error,
} from './components/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// you can optimize images by resizing and compressing them

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={SignIn} />
          <Route path='/signup' exact component={SignUp} />
          <Route path='/checkout' exact component={Checkout} />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
