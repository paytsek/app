import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const { auth, loading } = useSelector(state => state.authUser);
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth && !loading) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default LoggedInRoute;
