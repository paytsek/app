import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MuiSkeleton from '../../MuiSkeleton';

const DialogPasswordConfirmation = ({ handleClose, open, onContinue, loading, title }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnContinue = () => onContinue({ password, confirmPassword });

  useEffect(() => {
    setPassword('');
    setConfirmPassword('');
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {loading ? (
            <MuiSkeleton />
          ) : (
            <>
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                id="confirmPassword"
                label="Password confirmation"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleOnContinue} disabled={loading} color="secondary">
            Continue
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default DialogPasswordConfirmation;
