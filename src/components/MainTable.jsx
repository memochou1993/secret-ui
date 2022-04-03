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
import ButtonPasswordChange from './ButtonPasswordChange';
import ButtonSecretCreate from './ButtonSecretCreate';
import ButtonSecretDelete from './ButtonSecretDelete';
import ButtonSecretCopy from './ButtonSecretCopy';
import ButtonSecretView from './ButtonSecretView';
import {
  updateUser,
  fetchSecrets,
  storeSecret,
  updateSecret,
  destroySecret,
} from '../actions';
import {
  delay,
  encrypt,
  hash,
} from '../helpers';
import useAuth from '../hooks/useAuth';
import useSecrets from '../hooks/useSecrets';
import Secret from '../models/Secret';

export default function MainTable() {
  const { key, token, email } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [secrets, setSecrets] = useSecrets([]);
  const [keyword, setKeyword] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  useEffect(async () => {
    try {
      const { data } = await fetchSecrets({ token });
      await delay(0);
      setSecrets(data.map((secret) => new Secret(secret, key)));
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
    const { name, account, password } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const { data } = await storeSecret({
        token,
        name,
        ciphertext: encrypt(JSON.stringify({
          account,
          password,
        }), key),
      });
      setSecrets([new Secret(data, key), ...secrets]);
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
  const changePassword = async (e) => {
    e.preventDefault();
    const { password } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await updateUser({
        token,
        email,
        password,
      });
      await Promise.all(secrets.map((secret) => {
        return updateSecret({
          token,
          id: secret.id,
          name: secret.name,
          ciphertext: encrypt(JSON.stringify({
            account: secret.account,
            password: secret.password,
          }), hash(password)),
        });
      }));
      navigate('/logout');
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
            xs={4}
            sm={6}
            md={8}
          >
            <ButtonSecretCreate
              onCreate={createSecret}
            />
            <ButtonPasswordChange
              onChange={changePassword}
            />
          </Grid>
          <Grid
            item
            xs={8}
            sm={6}
            md={4}
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
                    <ButtonSecretView
                      isVisible={isVisible(secret.id)}
                      onToggleVisibility={toggleVisibility}
                      secretId={secret.id}
                    />
                    <ButtonSecretCopy
                      text={secret.password}
                    />
                    <ButtonSecretDelete
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
