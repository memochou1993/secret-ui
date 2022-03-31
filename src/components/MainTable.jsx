import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { fetchSecrets } from '../actions';
import { setInterceptors } from '../plugins/axios';
import useAuth from '../hooks/useAuth';
import { delay } from '../helpers';

export default function MainTable() {
  const auth = useAuth();
  const [secrets, setSecrets] = useState([]);
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  setInterceptors(auth);
  useEffect(async () => {
    const { data } = await fetchSecrets();
    await delay(250);
    setSecrets(data);
  }, []);
  const toggleVisibility = (id) => {
    if (visibleSecrets.some((v) => v === id)) {
      setVisibleSecrets(visibleSecrets.filter((v) => v !== id));
      return;
    }
    setVisibleSecrets([...visibleSecrets, id]);
  };
  if (secrets.length > 0) {
    return (
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
              <TableCell>
                &nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {secrets.map((secret) => (
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
                  >
                    {visibleSecrets.some((v) => v === secret.id) ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </TableCell>
                <TableCell
                  align="center"
                  size="small"
                >
                  &nbsp;
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
