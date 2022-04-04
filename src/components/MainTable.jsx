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
import ButtonSecretCopy from './ButtonSecretCopy';
import ButtonSecretCreate from './ButtonSecretCreate';
import ButtonSecretDelete from './ButtonSecretDelete';
import ButtonSecretEdit from './ButtonSecretEdit';
import ButtonSecretView from './ButtonSecretView';
import {
  updateUser,
  fetchSecrets,
  storeSecret,
  updateSecret,
  destroySecret,
} from '../actions';
import {
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
      const { data } = await fetchSecrets(token);
      data.sort((a, b) => a.name.localeCompare(b.name));
      setSecrets(data.map((secret) => new Secret(secret, key)));
      setIsLoading(false);
    } catch (e) {
      if (e?.response?.status === 401) navigate('/logout');
      console.error(e);
    }
  }, []);
  const filter = useMemo(() => (secret) => {
    const word = keyword.trim().toLowerCase();
    if (!word) return true;
    const find = (field, text) => secret[field].toLowerCase().includes(text);
    if (word.includes(':')) {
      const [field, text] = word.split(':');
      if (field === 'name') return find('name', text);
      if (field === 'account') return find('account', text);
    }
    if (find('name', word)) return true;
    if (find('account', word)) return true;
    return false;
  }, [keyword]);
  const isVisible = (id) => visibleSecrets.some((v) => v === id);
  const changePassword = async (e) => {
    const { password } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await updateUser({
        email,
        password,
      }, token);
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
    } catch (e) {
      if (e?.response?.status === 401) navigate('/logout');
      console.error(e);
    }
  };
  const createSecret = async (e) => {
    const { name, account, password } = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const { data } = await storeSecret({
        name,
        ciphertext: encrypt(JSON.stringify({
          account,
          password,
        }), key),
      }, token);
      setSecrets([new Secret(data, key), ...secrets]);
    } catch (e) {
      if (e?.response?.status === 401) navigate('/logout');
      console.error(e);
    }
  };
  const editSecret = async ({
    secretId,
    name,
    account,
    password,
  }) => {
    try {
      const data = {
        id: secretId,
        name,
        ciphertext: encrypt(JSON.stringify({
          account,
          password,
        }), key),
      };
      await updateSecret(data, token);
      setVisibleSecrets(secrets.splice(secrets.findIndex((secret) => secret.id === secretId), 1, new Secret(data, key)));
    } catch (e) {
      if (e?.response?.status === 401) navigate('/logout');
      console.error(e);
    }
  };
  const deleteSecret = async (id) => {
    try {
      await destroySecret(id, token);
      setSecrets(secrets.filter((secret) => secret.id !== id));
    } catch (e) {
      if (e?.response?.status === 401) navigate('/logout');
      console.error(e);
    }
  };
  const toggleVisibility = (id) => {
    if (isVisible(id)) {
      setVisibleSecrets(visibleSecrets.filter((i) => i !== id));
      return;
    }
    setVisibleSecrets([...visibleSecrets, id]);
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
                  align="right"
                  sx={{
                    minWidth: '10px',
                  }}
                >
                  #
                </TableCell>
                <TableCell
                  sx={{
                    minWidth: '200px',
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
                    display: {
                      xs: 'none',
                      sm: 'table-cell',
                    },
                  }}
                >
                  Password
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    minWidth: '200px',
                  }}
                >
                  &nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {secrets.filter(filter).map((secret, i) => (
                <TableRow
                  key={secret.id}
                >
                  <TableCell
                    align="right"
                    component="th"
                    scope="row"
                    size="small"
                  >
                    {(i + 1).toLocaleString()}
                  </TableCell>
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
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'table-cell',
                      },
                    }}
                  >
                    {isVisible(secret.id) ? secret.password : '••••••••••••'}
                  </TableCell>
                  <TableCell
                    align="center"
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
                    <ButtonSecretEdit
                      onEdit={editSecret}
                      secretId={secret.id}
                      defaultName={secret.name}
                      defaultAccount={secret.account}
                      defaultPassword={secret.password}
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
