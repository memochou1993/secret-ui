import React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth({ children }) {
  const { token, finished } = useAuth();
  const location = useLocation();
  if (!finished) {
    return null;
  }
  if (!token) {
    return (
      <Navigate
        replace
        state={{ path: location.pathname }}
        to="/login"
      />
    );
  }
  return children;
}

export default RequireAuth;
