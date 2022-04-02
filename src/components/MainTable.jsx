import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import CreateButton from './CreateButton';
import DeleteButton from './DeleteButton';
import UnlockButton from './UnlockButton';
import {
  fetchSecrets,
  storeSecret,
  destroySecret,
} from '../actions';
import useAuth from '../hooks/useAuth';
import { delay } from '../helpers';

export default function MainTable() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [secrets, setSecrets] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  useEffect(async () => {
    try {
      const { data } = await fetchSecrets({ token });
      await delay(250);
      setSecrets(data);
      setIsLoading(false);
    } catch {
      navigate('/logout');
    }
  }, []);
  const filter = useMemo(() => (secret) => {
    const k = keyword.trim().toUpperCase();
    if (!k) return true;
    if (secret.username.toUpperCase().includes(k)) return true;
    if (secret.tags.toUpperCase().includes(k)) return true;
    return false;
  }, [keyword]);
  const isVisible = (id) => visibleSecrets.some((v) => v === id);
  const toggleVisibility = (id) => {
    if (isVisible(id)) {
      setVisibleSecrets(visibleSecrets.filter((i) => i !== id));
      return;
    }
    setVisibleSecrets([...visibleSecrets, id]);
  };
  const createSecret = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const { data } = await storeSecret({
        token,
        username: formData.get('username'),
        password: formData.get('password'),
        tags: formData.get('tags'),
      });
      setSecrets([data, ...secrets]);
    } catch {
      navigate('/logout');
    }
  };
  const deleteSecret = async (id) => {
    try {
      await destroySecret({ token, id });
      setSecrets(secrets.filter((secret) => secret.id !== id));
    } catch {
      navigate('/logout');
    }
  };
  if (!isLoading) {
    return (
      <>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Grid
            item
            xs={8}
          >
            <CreateButton
              onCreate={createSecret}
            />
          </Grid>
          <Grid
            item
            xs={4}
          >
            <TextField
              autoComplete="off"
              autoFocus
              fullWidth
              placeholder="Search"
              size="small"
              onChange={(e) => setKeyword(e.currentTarget.value)}
            />
          </Grid>
        </Grid>
        <TableContainer
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Password
                </TableCell>
                <TableCell>
                  Tags
                </TableCell>
                <TableCell>
                  &nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {secrets.filter(filter).map((secret) => (
                <TableRow
                  key={secret.id}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    size="small"
                  >
                    {secret.username}
                  </TableCell>
                  <TableCell
                    size="small"
                  >
                    {isVisible(secret.id) ? secret.password : '••••••••••••'}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    size="small"
                  >
                    {secret.tags}
                  </TableCell>
                  <TableCell
                    size="small"
                  >
                    <UnlockButton
                      isVisible={isVisible(secret.id)}
                      onToggleVisibility={() => toggleVisibility(secret.id)}
                    />
                    <DeleteButton
                      onDelete={() => deleteSecret(secret.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      height={400}
      sx={{ borderRadius: '4px' }}
    />
  );
}
