import React from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ButtonSecretView(props) {
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
        mr: 1,
      }}
    >
      {isVisible ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
}
