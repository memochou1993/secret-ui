import React from 'react';
import Download from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function ButtonExportSecrets(props) {
  const { secrets } = props;
  const exportSecrets = () => {
    const payload = secrets.map((s) => ({
      name: s.name,
      account: s.account,
      password: s.password,
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `secrets-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <Tooltip title="Export backup (decrypted)">
      <IconButton
        color="primary"
        component="span"
        onClick={exportSecrets}
        sx={{
          mr: 1,
        }}
      >
        <Download />
      </IconButton>
    </Tooltip>
  );
}
