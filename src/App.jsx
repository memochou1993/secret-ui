import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Home from './routes/Home';
import Login from './routes/Login';
import RequireAuth from './components/RequireAuth';
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
      <BrowserRouter>
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
              path="login"
              element={<Login />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
