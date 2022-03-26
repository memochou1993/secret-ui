import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
      <AppBar color="primary">
        <Toolbar>
          <Typography
            color="inherit"
            component="h1"
            noWrap
            sx={{
              flexGrow: 1,
            }}
            variant="h6"
          >
            Secret
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: grey[300],
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
