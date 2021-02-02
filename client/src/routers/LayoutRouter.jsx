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

const LayoutRouter = () => (
  <Switch>
    <Route
      path="/:slug"
      component={() => (
        <Switch>
          <Route path="/:slug/users" component={UsersListPage} exact />
          <Route path="/:slug/users/:id/edit" component={UserEditPage} exact />
          <Route path="/:slug/users/:id" component={UserDetailsPage} exact />
          <Route path="/:slug/profile" component={CurrentUserProfilePage} exact />
          <Route path="/:slug/change-password" component={ChangePasswordPage} exact />
          <Route path="/:slug/companies" component={CompanyListPage} exact />
          <Route path="/:slug/company-settings" component={CompanySettingsPage} exact />
          <Route
            path="/:slug/company-settings/create"
            component={CompanySettingsCreatePage}
            exact
          />
          <Route
            path="/:slug/company-settings/:companyId/edit"
            component={CompanySettingsEditPage}
            exact
          />
          <Route path="/:slug/companies/create" component={CompanyCreatePage} exact />
          <Route path="/:slug/companies/:id" component={CompanyDetailsPage} exact />
          <Route path="/:slug/companies/:id/edit" component={CompanyUpdatePage} exact />
          <Route path="/:slug/dashboard" component={Dashboard} />
          <Route path="/" component={() => <h1 style={{ fontSize: 50 }}>Page not found</h1>} />
        </Switch>
      )}
    />
  </Switch>
);

export default LayoutRouter;
