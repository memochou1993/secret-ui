import React from 'react';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

export default function DeleteButton(props) {
  const { onDelete } = props;
  return (
    <IconButton
      color="primary"
      component="span"
      onClick={onDelete}
      sx={{
        mx: 1,
      }}
    >
      <DeleteOutline />
    </IconButton>
  );
}
