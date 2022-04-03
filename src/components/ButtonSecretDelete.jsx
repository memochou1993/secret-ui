import React from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

export default function ButtonSecretDelete(props) {
  const { onDelete, secretId } = props;
  const deleteSecret = () => {
    onDelete(secretId);
  };
  return (
    <IconButton
      color="primary"
      component="span"
      onClick={deleteSecret}
      sx={{
        mr: 1,
        display: {
          xs: 'none',
          sm: 'inline-flex',
        },
      }}
    >
      <DeleteOutline />
    </IconButton>
  );
}
