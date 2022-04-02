import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function CreateButton(props) {
  const { onCreate } = props;
  const [open, setOpen] = useState(false);
  const createSecret = (e) => {
    onCreate(e);
    setOpen(false);
  };
  return (
    <>
      <Button
        color="primary"
        disableRipple
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          height: '40px',
        }}
      >
        Create
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
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
    </>
  );
}
