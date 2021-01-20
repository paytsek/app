import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { auth, loading, user } = useSelector(state => state.authUser);
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth && !loading) {
          return <Redirect to="/login" />;
        }

        return user.role === 'admin' ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default AdminRoute;
