import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { grey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
