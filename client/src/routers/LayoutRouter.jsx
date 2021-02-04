import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersListPage from '../pages/UsersListPage';
import UserDetailsPage from '../pages/UserDetailsPage';
import UserEditPage from '../pages/UserEditPage';
import CurrentUserProfilePage from '../pages/CurrentUserProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import CompanyListPage from '../pages/CompanyListPage';
import CompanyDetailsPage from '../pages/CompanyDetailsPage';
import CompanyCreatePage from '../pages/CompanyCreatePage';
import CompanyUpdatePage from '../pages/CompanyUpdatePage';
import CompanySettingsPage from '../pages/CompanySettingsPage';
import CompanySettingsCreatePage from '../pages/CompanySettingsCreatePage';
import CompanySettingsEditPage from '../pages/CompanySettingsEditPage';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/routes/PrivateRoute';

const LayoutRouter = () => (
  <Switch>
    <Route
      path="/:slug"
      component={() => (
        <Switch>
          <PrivateRoute path="/:slug/users" component={UsersListPage} exact />
          <PrivateRoute path="/:slug/users/:id/edit" component={UserEditPage} exact />
          <PrivateRoute path="/:slug/users/:id" component={UserDetailsPage} exact />
          <PrivateRoute path="/:slug/profile" component={CurrentUserProfilePage} exact />
          <PrivateRoute path="/:slug/change-password" component={ChangePasswordPage} exact />
          <PrivateRoute path="/:slug/companies" component={CompanyListPage} exact />
          <PrivateRoute path="/:slug/company-settings" component={CompanySettingsPage} exact />
          <PrivateRoute
            path="/:slug/company-settings/create"
            component={CompanySettingsCreatePage}
            exact
          />
          <PrivateRoute
            path="/:slug/company-settings/:companyId/edit"
            component={CompanySettingsEditPage}
            exact
          />
          <PrivateRoute path="/:slug/companies/create" component={CompanyCreatePage} exact />
          <PrivateRoute path="/:slug/companies/:id" component={CompanyDetailsPage} exact />
          <PrivateRoute path="/:slug/companies/:id/edit" component={CompanyUpdatePage} exact />
          <PrivateRoute path="/:slug/dashboard" component={Dashboard} />
          <PrivateRoute
            path="/"
            component={() => <h1 style={{ fontSize: 50 }}>Page not found</h1>}
          />
        </Switch>
      )}
    />
  </Switch>
);

export default LayoutRouter;
