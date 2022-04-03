import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ButtonPasswordChange(props) {
  const { onChange } = props;
  const [open, setOpen] = useState(false);
  const changePassword = (e) => {
    onChange(e);
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
          mr: '4px',
        }}
      >
        Update Password
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          component="form"
          onSubmit={changePassword}
        >
          <DialogTitle>
            Update Password
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
              label="Password"
              margin="dense"
              name="password"
              required
              type="password"
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
              Update
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
