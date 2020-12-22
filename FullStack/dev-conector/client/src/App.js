import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './comonents/routing/PrivateRoute';
import {
  Landing,
  Login,
  Register,
  Dashboard,
  CreateEditProfile,
  AddExperience,
  AddEducation,
} from './comonents/pages';
import { Navbar, Alert } from './comonents/utilityComponents';
// Redux
import { Provider } from 'react-redux';
import store from './stateManager/store';
import { loadUser } from './stateManager/actions/authAction';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Register} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute
            path={['/create-profile', '/edit-profile']}
            exact
            component={CreateEditProfile}
          />
          <PrivateRoute
            path='/add-experience'
            exact
            component={AddExperience}
          />
          <PrivateRoute path='/add-education' exact component={AddEducation} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
