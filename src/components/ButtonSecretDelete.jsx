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
        mx: 1,
      }}
    >
      <DeleteOutline />
    </IconButton>
  );
}
