import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { grey } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MainTable from '../components/MainTable';
import useAuth from '../hooks/useAuth';

function Home() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate('/logout');
  };
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
          {token && (
            <div>
              <IconButton
                color="inherit"
                onClick={handleMenu}
                size="large"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  horizontal: 'right',
                  vertical: 'bottom',
                }}
                id="menu-appbar"
                keepMounted
                onClose={handleClose}
                open={Boolean(anchorEl)}
                transformOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
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
              pt: 15,
            }}
          >
            <MainTable />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;
