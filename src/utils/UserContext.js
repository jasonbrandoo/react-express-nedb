import React from 'react';
import PropTypes from 'prop-types';
import useToken from './useToken';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const { userData, setUserData, status, setStatus } = useToken();

  return (
    <UserContext.Provider value={{ userData, setUserData, status, setStatus }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
