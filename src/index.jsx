import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import App from './App';

const theme = createTheme({
  palette: {
    //
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
    >
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.grey[900],
          height: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
        >
          <App />
        </Container>
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
