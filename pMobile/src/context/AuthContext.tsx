import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({ isLoggedIn: false, login: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => setLoggedIn(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
