import React from 'react';

const UserContext = React.createContext(null);

export const useUser = () => React.useContext(UserContext)

export const UserContextProvider = ({ children }) => {
  const userState = React.useState();

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>
}