import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LockOutlined from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';

function Copyright(props) {
  return (
    <Typography
      align="center"
      color="text.secondary"
      variant="body2"
      {...props}
    >
      {`© ${(new Date()).getFullYear()} `}
      <Link
        color="inherit"
        href="https://github.com/memochou1993"
        rel="noopener noreferrer"
        target="_blank"
      >
        Memo Chou
      </Link>
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await login({
        email,
        password,
      });
      navigate(state?.path || '/');
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          mt: 14,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            m: 2,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Secret
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            mt: 2,
          }}
        >
          <TextField
            autoComplete="email"
            autoFocus
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            required
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            required
            type="password"
          />
          <Button
            fullWidth
            sx={{
              mb: 1,
              mt: 2,
            }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
      { error && (
        <Alert
          severity="error"
          sx={{
            mb: 1,
            mt: 2,
          }}
        >
          Incorrect email address or password.
        </Alert>
      )}
      <Copyright
        sx={{
          mt: 4,
        }}
      />
    </Container>
  );
}
