import React from 'react';
import ContentCopy from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

export default function CopyButton(props) {
  const { text } = props;
  return (
    <IconButton
      color="primary"
      component="span"
      onClick={() => window.navigator.clipboard.writeText(text)}
      sx={{
        mx: 1,
      }}
    >
      <ContentCopy />
    </IconButton>
  );
}
