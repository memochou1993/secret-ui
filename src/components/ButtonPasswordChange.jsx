import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LockReset from '@mui/icons-material/LockReset';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export default function ButtonPasswordChange(props) {
  const { onChange } = props;
  const [open, setOpen] = useState(false);
  const changePassword = (e) => {
    e.preventDefault();
    onChange(e);
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
        <LockReset />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          component="form"
          onSubmit={changePassword}
        >
          <DialogTitle>
            Reset Password
          </DialogTitle>
          <DialogContent>
            <TextField
              autoComplete="off"
              autoFocus
              fullWidth
              id="password"
              inputProps={{
                minLength: 8,
              }}
              label="New Password"
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
              Reset
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
