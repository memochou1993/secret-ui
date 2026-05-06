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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MainTable from '../../components/MainTable';
import useAuth from '../../hooks/useAuth';

function Home() {
  const navigate = useNavigate();
  const {
    key,
    token,
    setKey,
    registerPasskey,
  } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    navigate('/logout');
  };

  const handleRegisterPasskey = async () => {
    setAnchorEl(null);
    try {
      await registerPasskey();
      setMessage('Passkey registered successfully');
      setSeverity('success');
    } catch (e) {
      setMessage(e.message);
      setSeverity('error');
    }
  };

  const handleSubmitMasterPassword = (e) => {
    e.preventDefault();
    setKey(password);
  };

  return (
    <>
      <AppBar
        color="primary"
      >
        <Toolbar
          variant="dense"
        >
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
                onClick={(e) => setAnchorEl(e.currentTarget)}
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
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                transformOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
              >
                <MenuItem
                  onClick={handleRegisterPasskey}
                >
                  Register Passkey
                </MenuItem>
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
      <Snackbar
        autoHideDuration={6000}
        onClose={() => setMessage('')}
        open={Boolean(message)}
      >
        <Alert
          onClose={() => setMessage('')}
          severity={severity}
          sx={{
            width: '100%',
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Dialog
        open={!key}
      >
        <DialogTitle>
          Master Password
        </DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmitMasterPassword}
        >
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="Master Password"
              margin="dense"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              value={password}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Box
        component="main"
        sx={{
          backgroundColor: grey[100],
          minHeight: '100vh',
        }}
      >
        <Container
          maxWidth="lg"
        >
          <Box
            sx={{
              pt: 12,
              pb: 8,
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
