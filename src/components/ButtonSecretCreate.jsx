import React, { useState } from 'react';
import AddBox from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export default function ButtonSecretCreate(props) {
  const { onCreate } = props;
  const [open, setOpen] = useState(false);
  const createSecret = (e) => {
    onCreate(e);
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
        <AddBox />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          component="form"
          onSubmit={createSecret}
        >
          <DialogTitle>
            Create Secret
          </DialogTitle>
          <DialogContent>
            <TextField
              autoComplete="off"
              autoFocus
              fullWidth
              id="name"
              label="Name"
              margin="dense"
              name="name"
              required
              type="text"
              variant="outlined"
            />
            <TextField
              autoComplete="off"
              fullWidth
              id="account"
              label="Account"
              margin="dense"
              name="account"
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
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
