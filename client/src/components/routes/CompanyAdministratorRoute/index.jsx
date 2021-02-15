import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CompanyAdministratorRoute = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state) => state.authUser);
  const { isAdministrator } = useSelector((state) => state.companyTenant);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAdministrator && user.role !== 'admin') {
          return <Redirect to="dashboard" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default CompanyAdministratorRoute;
