import React from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ViewButton(props) {
  const {
    isVisible,
    onToggleVisibility,
    secretId,
  } = props;
  const toggleVisibility = () => {
    onToggleVisibility(secretId);
  };
  return (
    <IconButton
      color="primary"
      component="span"
      onClick={toggleVisibility}
      sx={{
        mx: 1,
      }}
    >
      {isVisible ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
}
