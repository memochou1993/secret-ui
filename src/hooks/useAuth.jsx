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
  const [key, setKey] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const login = ({ email, password }) => {
    return new Promise((res, rej) => {
      fetchToken({ email, password })
        .then(({ token }) => {
          setKey(hash(password));
          setToken(token);
          res();
        })
        .catch((e) => rej(e));
    });
  };
  const logout = () => {
    setToken('');
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
