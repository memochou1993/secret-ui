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
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setKey(sessionStorage.getItem('key'));
    setToken(sessionStorage.getItem('token'));
    setEmail(sessionStorage.getItem('email'));
    setLoading(false);
  }, []);
  const login = ({ email, password }) => {
    return new Promise((res, rej) => {
      fetchToken({ email, password })
        .then(({ token }) => {
          const key = hash(password);
          setKey(key);
          setToken(token);
          setEmail(email);
          sessionStorage.setItem('key', key);
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', email);
          res();
        })
        .catch((e) => rej(e));
    });
  };
  const logout = () => {
    setKey(null);
    setToken(null);
    setEmail(null);
    sessionStorage.clear();
  };
  const value = {
    key,
    token,
    email,
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
