import React from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = React.useState({
    id: '',
    username: '',
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
