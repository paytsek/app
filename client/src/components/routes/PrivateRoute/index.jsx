import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector((state) => state.authUser);
  const { authSlug } = useSelector((state) => state.companyTenant);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth && !authSlug) {
          return <Redirect to="/select-company" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
