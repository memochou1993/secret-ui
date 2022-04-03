import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import RequireAuth from './components/RequireAuth';
import RequireGuest from './components/RequireGuest';
import { AuthProvider } from './hooks/useAuth';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

export default function App() {
  return (
    <ThemeProvider
      theme={theme}
    >
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route
              index
              element={(
                <RequireAuth>
                  <Home />
                </RequireAuth>
              )}
            />
            <Route
              path="logout"
              element={(
                <RequireAuth>
                  <Logout />
                </RequireAuth>
              )}
            />
            <Route
              path="login"
              element={(
                <RequireGuest>
                  <Login />
                </RequireGuest>
              )}
            />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
}
