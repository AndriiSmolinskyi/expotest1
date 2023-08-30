import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const clearUserData = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };