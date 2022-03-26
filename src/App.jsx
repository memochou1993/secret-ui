import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import MainTable from './MainTable';

function App() {
  return (
    <Box
      sx={{
        paddingTop: '120px',
      }}
    >
      <MainTable />
    </Box>
  );
}

export default App;
