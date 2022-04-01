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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setToken(Cookie.get('token') || '');
    setLoading(false);
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
  const logout = () => {
    setToken('');
    Cookie.remove('token');
  };
  const value = {
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
