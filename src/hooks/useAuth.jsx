import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchToken } from '../actions';

const AuthContext = createContext(null);

export default function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const login = ({ email, password }) => {
    return new Promise((res, rej) => {
      fetchToken({ email, password })
        .then(({ token }) => {
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
