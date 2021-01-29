import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoggedInRoute from '../components/routes/LoggedInRoute';
import AdminRoute from '../components/routes/AdminRoute';
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
          <AdminRoute path="/:slug/users" component={UsersListPage} exact />
          <AdminRoute path="/:slug/users/:id/edit" component={UserEditPage} exact />
          <LoggedInRoute path="/:slug/users/:id" component={UserDetailsPage} exact />
          <LoggedInRoute path="/:slug/profile" component={CurrentUserProfilePage} exact />
          <LoggedInRoute path="/:slug/change-password" component={ChangePasswordPage} exact />
          <LoggedInRoute path="/:slug/companies" component={CompanyListPage} exact />
          <LoggedInRoute path="/:slug/company-settings" component={CompanySettingsPage} exact />
          <LoggedInRoute
            path="/:slug/company-settings/create"
            component={CompanySettingsCreatePage}
            exact
          />
          <LoggedInRoute
            path="/:slug/company-settings/:companyId/settings/:companySettingsId"
            component={CompanySettingsEditPage}
          />
          <LoggedInRoute path="/:slug/companies/create" component={CompanyCreatePage} exact />
          <LoggedInRoute path="/:slug/companies/:id" component={CompanyDetailsPage} exact />
          <LoggedInRoute path="/:slug/companies/:id/edit" component={CompanyUpdatePage} exact />
          <LoggedInRoute path="/:slug/dashboard" component={Dashboard} />
          <Route path="/" component={() => <h1 style={{ fontSize: 50 }}>Page not found</h1>} />
        </Switch>
      )}
    />
  </Switch>
);

export default LayoutRouter;
