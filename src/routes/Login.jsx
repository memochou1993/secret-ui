import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await login({
        email: data.get('email'),
        password: data.get('password'),
      });
      navigate(state?.path || '/');
    } catch (e) {
      // TODO
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
          marginTop: 16,
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'primary.main',
            m: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
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
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
      <Copyright
        sx={{
          mb: 4,
          mt: 4,
        }}
      />
    </Container>
  );
}
