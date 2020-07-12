import React from 'react';
import PropTypes from 'prop-types';
import useToken from './useToken';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const { status } = useToken('status');

  return (
    <UserContext.Provider value={{ status }}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
