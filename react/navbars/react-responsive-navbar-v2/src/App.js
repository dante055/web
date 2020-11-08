import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import {
  Consulting,
  ContactUs,
  Design,
  Development,
  Home,
  Marketing,
  Products,
  Services,
  SignUp,
} from './components/pages/index';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/marketing' component={Marketing} />
        <Route path='/consulting' component={Consulting} />
        <Route path='/design' component={Design} />
        <Route path='/development' component={Development} />
      </Switch>
    </Router>
  );
}

export default App;
