import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireGuest({ children }) {
  const { token, finished } = useAuth();
  const location = useLocation();
  if (!finished) {
    return null;
  }
  if (token) {
    return (
      <Navigate
        replace
        state={{ path: location.pathname }}
        to="/"
      />
    );
  }
  return children;
}

export default RequireGuest;
