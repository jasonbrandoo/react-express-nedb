import React from 'react';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [login, setLogin] = React.useState(false);

  return (
    <UserContext.Provider value={{ login, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}
