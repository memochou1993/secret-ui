import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import { deriveKey } from '../helpers';
import {
  fetchToken,
  fetchWebAuthnLoginOptions,
  fetchWebAuthnRegisterOptions,
  finishWebAuthnLogin,
  finishWebAuthnRegister,
} from '../actions';

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
    const t = sessionStorage.getItem('token');
    const e = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    setToken(t);
    setEmail(e);
    if (password && e) {
      deriveKey(password, e)
        .then(setKey)
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
      return;
    }
    setLoading(false);
  }, []);
  const login = async ({ email, password }) => {
    const { token } = await fetchToken({ email, password });
    const k = await deriveKey(password, email);
    setKey(k);
    setToken(token);
    setEmail(email);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
  };
  const registerPasskey = async () => {
    try {
      const options = await fetchWebAuthnRegisterOptions(token);
      const attestation = await startRegistration({ optionsJSON: options });
      await finishWebAuthnRegister(attestation, token);
    } catch (e) {
      throw new Error(e.response?.data?.message || e.message);
    }
  };
  const loginWithPasskey = async () => {
    try {
      const options = await fetchWebAuthnLoginOptions();
      const assertion = await startAuthentication({ optionsJSON: options });
      const { token, email } = await finishWebAuthnLogin(assertion);
      setToken(token);
      setEmail(email);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('email', email);
    } catch (e) {
      throw new Error(e.response?.data?.message || e.message);
    }
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
    loginWithPasskey,
    registerPasskey,
    logout,
    setKey: async (password) => {
      const k = await deriveKey(password, email);
      setKey(k);
      sessionStorage.setItem('password', password);
    },
  };
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}
