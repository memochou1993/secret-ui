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
import useAuth from '../hooks/useAuth';

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await login({
        email: formData.get('email'),
        password: formData.get('password'),
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
          mt: 16,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            m: 1,
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
          onSubmit={handleSubmit}
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
              mb: 2,
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
        >
          Incorrect username or password.
        </Alert>
      )}
      <Copyright
        sx={{
          mb: 4,
          mt: 4,
        }}
      />
    </Container>
  );
}
