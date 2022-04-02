import React from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function UnlockButton(props) {
  const { isVisible, onToggleVisibility } = props;
  return (
    <IconButton
      color="primary"
      component="span"
      onClick={onToggleVisibility}
      sx={{
        mx: 1,
      }}
    >
      {isVisible ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
}
