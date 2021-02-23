import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

const DialogAlert = ({ open, handleClose, title, onConfirm, loading }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus disabled={loading}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default DialogAlert;
