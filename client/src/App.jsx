import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Notifier from './components/Notifier';
import Layout from './components/layout';
import LayoutRouter from './routers/LayoutRouter';
import LoggedInRoute from './components/routes/LoggedInRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import SelectCompanyPage from './pages/SelectCompanyPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import { authUser } from './redux/actions/usersActions';
import { getCompanySlug } from './redux/actions/companiesActions';
import setAuthToken from './utils/setAuthToken';
import setCompanySlug from './utils/setCompanySlug';
import './stylesheets/main.scss';

const token = localStorage.getItem('token');
const slug = localStorage.getItem('slug');

if (token) {
  setAuthToken(token);
}

if (slug) {
  setCompanySlug(slug);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser());
    dispatch(getCompanySlug());
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
          <PrivateRoute path="/:slug" component={(props) => <LayoutRouter {...props} />} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
