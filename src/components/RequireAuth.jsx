import React from 'react';
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.token) {
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
