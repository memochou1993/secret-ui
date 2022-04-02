import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { hash } from '../helpers';
import { fetchToken } from '../actions';

const AuthContext = createContext(null);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [key, setKey] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setKey(sessionStorage.getItem('key'));
    setToken(sessionStorage.getItem('token'));
    setLoading(false);
  }, []);
  const login = ({ email, password }) => {
    return new Promise((res, rej) => {
      fetchToken({ email, password })
        .then(({ token }) => {
          const key = hash(password);
          setKey(key);
          setToken(token);
          sessionStorage.setItem('key', key);
          sessionStorage.setItem('token', token);
          res();
        })
        .catch((e) => rej(e));
    });
  };
  const logout = () => {
    setKey(null);
    setToken(null);
    sessionStorage.clear();
  };
  const value = {
    key,
    token,
    loading,
    login,
    logout,
  };
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}
