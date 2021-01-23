import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import MuiSkeleton from '../../MuiSkeleton';

const PasswordConfirmationDialog = ({ handleClose, open, onContinue, loading }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnClose = () => {
    handleClose();
    setPassword('');
    setConfirmPassword('');
  };

  const handleOnContinue = () => onContinue({ password, confirmPassword });

  return (
    <div>
      <Dialog open={open} onClose={handleOnClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
        <Fragment>
          <DialogTitle id="form-dialog-title">Are you sure you want to delete your profile?</DialogTitle>
          <DialogContent>
            {loading ? (
              <MuiSkeleton />
            ) : (
              <Fragment>
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="confirmPassword"
                  label="Password confirmation"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Fragment>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnClose} color="primary" disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleOnContinue} disabled={loading} color="secondary">
              Continue
            </Button>
          </DialogActions>
        </Fragment>
      </Dialog>
    </div>
  );
};

export default PasswordConfirmationDialog;
