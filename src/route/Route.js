/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route as Router, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useToken from '../utils/useToken';

function PrivateRoute({ children }) {
  const { status } = useToken('status');

  if (status === 'logged-in') {
    return children;
  }
  return <Redirect to="/login" />;
}

function Route({ component: Component, auth, ...rest }) {
  if (auth) {
    return (
      <Router
        {...rest}
        render={props => (
          <PrivateRoute>
            <Component {...props} />
          </PrivateRoute>
        )}
      />
    );
  }

  return <Router {...rest} render={props => <Component {...props} />} />;
}

Route.defaultProps = {
  auth: undefined,
};

Route.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.bool,
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Route;
