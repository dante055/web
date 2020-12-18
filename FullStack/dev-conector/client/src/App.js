import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing, Login, Register } from './comonents/pages';
import { Navbar, Alert } from './comonents/utilityComponents';
// Redux
import { Provider } from 'react-redux';
import store from './stateManager/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path='/' exact component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Register} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
