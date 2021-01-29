import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import cx from 'classnames';

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
import useStyles from './styles';

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

  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

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
        <Layout openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
          <main
            className={cx(classes.content, {
              [classes.contentShift]: openDrawer,
            })}
          >
            <div style={{ minHeight: 80 }} />

            <PrivateRoute
              path="/:slug"
              component={props => <LayoutRouter {...props} />}
            />
          </main>
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
