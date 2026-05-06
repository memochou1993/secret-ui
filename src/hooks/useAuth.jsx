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
import { hash } from '../helpers';
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
    setKey: (password) => {
      const key = hash(password);
      setKey(key);
      sessionStorage.setItem('key', key);
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
