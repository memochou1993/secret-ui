import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookie from 'js-cookie';
import { fetchToken } from '../actions';

const AuthContext = createContext(null);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  useEffect(() => {
    // FIXME
    setToken(Cookie.get('token') || '');
  }, []);
  const login = ({ email, password }) => new Promise((res, rej) => {
    fetchToken({ email, password })
      .then(({ token }) => {
        setToken(token);
        Cookie.set('token', token, { expires: 3600 / 86400 });
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
