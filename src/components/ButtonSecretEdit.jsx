import React, { useState } from 'react';
import Edit from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export default function ButtonSecretEdit(props) {
  const {
    onEdit,
    secretId,
    defaultName,
    defaultAccount,
    defaultPassword,
  } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(defaultName);
  const [account, setAccount] = useState(defaultAccount);
  const [password, setPassword] = useState(defaultPassword);
  const editSecret = (e) => {
    e.preventDefault();
    onEdit({
      secretId,
      name,
      account,
      password,
    });
    setOpen(false);
  };
  return (
    <>
      <IconButton
        color="primary"
        component="span"
        onClick={() => setOpen(true)}
        sx={{
          mr: 1,
        }}
      >
        <Edit />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          component="form"
          onSubmit={editSecret}
        >
          <DialogTitle>
            Edit Secret
          </DialogTitle>
          <DialogContent>
            <TextField
              autoComplete="off"
              autoFocus
              fullWidth
              id="name"
              inputProps={{
                autoCapitalize: 'none',
              }}
              label="Name"
              margin="dense"
              name="name"
              required
              type="text"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoComplete="off"
              fullWidth
              id="account"
              inputProps={{
                autoCapitalize: 'none',
              }}
              label="Account"
              margin="dense"
              name="account"
              required
              type="text"
              variant="outlined"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
            <TextField
              autoComplete="off"
              fullWidth
              id="password"
              inputProps={{
                autoCapitalize: 'none',
              }}
              label="Password"
              margin="dense"
              name="password"
              required
              type="text"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions
            sx={{
              pt: 0,
              px: 3,
              pb: 2,
            }}
          >
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
            >
              Edit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
