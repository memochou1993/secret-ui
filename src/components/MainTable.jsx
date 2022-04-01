import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
import {
  fetchSecrets,
  storeSecrets,
} from '../actions';
import { setInterceptors } from '../plugins/axios';
import useAuth from '../hooks/useAuth';
import { delay } from '../helpers';

export default function MainTable() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [secrets, setSecrets] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState([]);
  const [isCreateFormOpen, setIsCreateFormOpen] = React.useState(false);
  setInterceptors(auth);
  useEffect(async () => {
    const { data } = await fetchSecrets();
    await delay(250);
    setSecrets(data);
    setIsLoading(false);
  }, [keyword]);
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
    if (visibleSecrets.some((v) => v === id)) {
      setVisibleSecrets(visibleSecrets.filter((v) => v !== id));
      return;
    }
    setVisibleSecrets([...visibleSecrets, id]);
  };
  const createSecret = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { data } = await storeSecrets({
      username: formData.get('username'),
      password: formData.get('password'),
      tags: formData.get('tags'),
    });
    setSecrets([data, ...secrets]);
    setIsCreateFormOpen(false);
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
            <div>
              <Button
                color="primary"
                disableRipple
                variant="outlined"
                onClick={() => setIsCreateFormOpen(true)}
                sx={{
                  height: '40px',
                }}
              >
                Create
              </Button>
              <Dialog
                open={isCreateFormOpen}
                onClose={() => setIsCreateFormOpen(false)}
              >
                <Box
                  component="form"
                  onSubmit={createSecret}
                >
                  <DialogTitle>
                    New Secret
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoComplete="off"
                      autoFocus
                      fullWidth
                      id="username"
                      label="Username"
                      margin="dense"
                      name="username"
                      required
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      autoComplete="off"
                      fullWidth
                      id="password"
                      label="Password"
                      margin="dense"
                      name="password"
                      required
                      type="password"
                      variant="outlined"
                    />
                    <TextField
                      autoComplete="off"
                      fullWidth
                      id="tags"
                      label="Tags"
                      margin="dense"
                      name="tags"
                      required
                      type="text"
                      variant="outlined"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setIsCreateFormOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </div>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <TextField
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
