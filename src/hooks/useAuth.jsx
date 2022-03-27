import React, { createContext, useContext, useState } from 'react';
import { fetchToken } from '../actions';

const AuthContext = createContext(null);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const login = ({ email, password }) => new Promise((res, rej) => {
    fetchToken({ email, password })
      .then(({ token }) => {
        setToken(token);
        res();
      })
      .catch((e) => rej(e));
  });
  const value = {
    token,
    login,
  };
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}
