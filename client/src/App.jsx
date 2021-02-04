import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Notifier from './components/Notifier';
import Layout from './components/layout';
import LayoutRouter from './routers/LayoutRouter';
import LoggedInRoute from './components/routes/LoggedInRoute';
import SelectCompanyPage from './pages/SelectCompanyPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import { authUser } from './redux/actions/usersActions';
import { getCompanyTenant } from './redux/actions/companiesActions';
import setAuthToken from './utils/setAuthToken';
import setTenant from './utils/setTenant';
import './stylesheets/main.scss';

const token = localStorage.getItem('token');
const slug = localStorage.getItem('tenant');

if (token) {
  setAuthToken(token);
}

if (slug) {
  setTenant(slug);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
    dispatch(getCompanyTenant());
  }, [slug]);

  return (
    <Router>
      <CssBaseline />
      <Notifier />
      <Switch>
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <LoggedInRoute path="/select-company" component={SelectCompanyPage} exact />
        <Layout>
          <Route path="/:slug" component={(props) => <LayoutRouter {...props} />} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
