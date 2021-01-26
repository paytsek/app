import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  // DialogContent,
  // DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const DialogAlert = ({ open, handleClose, title, onConfirm }) => (
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

export default DialogAlert;
