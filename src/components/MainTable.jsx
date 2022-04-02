import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CreateButton from './CreateButton';
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
    if (!keyword) {
      return true;
    }
    return secret.username.includes(keyword) || secret.tags.includes(keyword);
  }, [keyword]);
  const search = (e) => {
    setKeyword(e.currentTarget.value);
  };
  const toggleVisibility = (id) => {
    if (visibleSecrets.some((i) => i === id)) {
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
              onCreateSecret={createSecret}
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
              onChange={search}
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
                    {visibleSecrets.some((v) => v === secret.id) ? secret.password : '••••••••••••'}
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
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={() => toggleVisibility(secret.id)}
                      sx={{
                        mx: 1,
                      }}
                    >
                      {visibleSecrets.some((v) => v === secret.id) ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={() => deleteSecret(secret.id)}
                      sx={{
                        mx: 1,
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
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
