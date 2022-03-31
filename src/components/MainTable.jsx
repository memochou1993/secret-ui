import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
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

export default function MainTable() {
  const auth = useAuth();
  const [secrets, setSecrets] = useState([]);
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  setInterceptors(auth);
  useEffect(async () => {
    const { data } = await fetchSecrets();
    setSecrets(data);
  }, []);
  const toggleVisibility = (id) => {
    if (visibleSecrets.some((v) => v === id)) {
      setVisibleSecrets(visibleSecrets.filter((v) => v !== id));
      return;
    }
    setVisibleSecrets([...visibleSecrets, id]);
  };
  return (
    <TableContainer
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Password
            </TableCell>
            <TableCell
              align="center"
            >
              &nbsp;
            </TableCell>
            <TableCell
              align="center"
            >
              &nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {secrets.map((secret) => (
            <TableRow
              key={secret.name}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {secret.name}
              </TableCell>
              <TableCell>
                {visibleSecrets.some((v) => v === secret.id) ? secret.value : '••••••••••••'}
              </TableCell>
              <TableCell>
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
