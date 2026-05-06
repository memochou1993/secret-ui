import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Upgrade from '@mui/icons-material/Upgrade';
import { updateSecret } from '../actions';
import { decrypt, encrypt, isLegacy } from '../helpers';

export default function ButtonMigrateEncryption(props) {
  const {
    keys,
    secrets,
    token,
    onMigrated,
  } = props;
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const legacyCount = secrets.filter((s) => isLegacy(s.ciphertext)).length;

  const migrate = async () => {
    setRunning(true);
    let migrated = 0;
    let failed = 0;
    for (const secret of secrets) {
      if (!isLegacy(secret.ciphertext)) continue;
      try {
        const plaintext = JSON.stringify({
          account: secret.account,
          password: secret.password,
        });
        const newCiphertext = await encrypt(plaintext, keys);
        const verified = await decrypt(newCiphertext, keys);
        if (verified !== plaintext) {
          failed += 1;
          continue;
        }
        await updateSecret({
          id: secret.id,
          name: secret.name,
          ciphertext: newCiphertext,
        }, token);
        const updated = { ...secret, ciphertext: newCiphertext };
        Object.setPrototypeOf(updated, Object.getPrototypeOf(secret));
        onMigrated(updated);
        migrated += 1;
      } catch (e) {
        console.error(e);
        failed += 1;
      }
    }
    setRunning(false);
    setOpen(false);
    setResult({ migrated, failed });
  };

  return (
    <>
      <Tooltip title={`Migrate ${legacyCount} legacy secret${legacyCount === 1 ? '' : 's'} to AES-GCM`}>
        <IconButton
          color="primary"
          component="span"
          onClick={() => setOpen(true)}
          sx={{
            mr: 1,
          }}
        >
          <Upgrade />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth
        open={open}
        onClose={() => (running ? null : setOpen(false))}
      >
        <DialogTitle>
          Migrate Encryption
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`This will re-encrypt ${legacyCount} secret${legacyCount === 1 ? '' : 's'} from the legacy format (SHA256 + AES-CBC) to AES-GCM with PBKDF2-derived key. Each secret is verified by round-trip decryption before being saved. Recommended: export a backup first.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            pt: 0,
            px: 3,
            pb: 2,
          }}
        >
          <Button
            disabled={running}
            onClick={() => setOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            disabled={running}
            onClick={migrate}
            variant="contained"
          >
            {running ? 'Migrating…' : 'Migrate'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={6000}
        onClose={() => setResult(null)}
        open={Boolean(result)}
      >
        <Alert
          onClose={() => setResult(null)}
          severity={result?.failed ? 'warning' : 'success'}
          sx={{
            width: '100%',
          }}
        >
          {result && `Migrated ${result.migrated} secret${result.migrated === 1 ? '' : 's'}${result.failed ? `, ${result.failed} failed` : ''}.`}
        </Alert>
      </Snackbar>
    </>
  );
}
