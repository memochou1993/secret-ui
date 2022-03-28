import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(async () => {
    await logout();
    navigate('/login');
  }, []);
  return null;
}
