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
import CopyButton from './CopyButton';
import CreateButton from './CreateButton';
import DeleteButton from './DeleteButton';
import ViewButton from './ViewButton';
import {
  fetchSecrets,
  storeSecret,
  destroySecret,
} from '../actions';
import {
  decrypt,
  delay,
  encrypt,
} from '../helpers';
import useAuth from '../hooks/useAuth';

export default function MainTable() {
  const { key, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [secrets, setSecrets] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  useEffect(async () => {
    try {
      const { data } = await fetchSecrets({ token });
      await delay(250);
      const secrets = data.map((secret) => {
        const { id, name, ciphertext } = secret;
        const { account, password } = JSON.parse(decrypt(ciphertext, key));
        return {
          id,
          name,
          account,
          password,
        };
      });
      setSecrets(secrets);
      setIsLoading(false);
    } catch {
      navigate('/logout');
    }
  }, []);
  const filter = useMemo(() => (secret) => {
    const word = keyword.trim().toUpperCase();
    if (!word) return true;
    if (secret.name.toUpperCase().includes(word)) return true;
    if (secret.account.toUpperCase().includes(word)) return true;
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
        name: formData.get('name'),
        ciphertext: encrypt(JSON.stringify({
          account: formData.get('account'),
          password: formData.get('password'),
        }), key),
      });
      const { id, name, ciphertext } = data;
      const secret = {
        id,
        name,
        ...JSON.parse(decrypt(ciphertext, key)),
      };
      setSecrets([secret, ...secrets]);
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
                <TableCell
                  sx={{
                    minWidth: '100px',
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: '100px',
                  }}
                >
                  Account
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: '200px',
                  }}
                >
                  Password
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: '100px',
                  }}
                >
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
                    {secret.name}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    size="small"
                  >
                    {secret.account}
                  </TableCell>
                  <TableCell
                    size="small"
                  >
                    {isVisible(secret.id) ? secret.password : '••••••••••••'}
                  </TableCell>
                  <TableCell
                    size="small"
                  >
                    <ViewButton
                      isVisible={isVisible(secret.id)}
                      onToggleVisibility={toggleVisibility}
                      secretId={secret.id}
                    />
                    <CopyButton
                      text={secret.password}
                    />
                    <DeleteButton
                      onDelete={deleteSecret}
                      secretId={secret.id}
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
