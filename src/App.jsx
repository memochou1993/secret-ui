import React from 'react';
import './App.css';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MainTable from './MainTable';

function App() {
  return (
    <>
      <AppBar
        color="primary"
      >
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
          backgroundColor: grey[100],
          height: '100vh',
        }}
      >
        <Container
          maxWidth="sm"
        >
          <Box
            sx={{
              paddingTop: '120px',
            }}
          >
            <MainTable />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
