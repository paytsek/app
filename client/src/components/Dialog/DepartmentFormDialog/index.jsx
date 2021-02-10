import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import DepartmentForm from '../../Department/DepartmentForm';
import MuiSkeleton from '../../MuiSkeleton';

import useStyles from './styles';

const DepartmentFormDialog = ({ handleClose, open, loading, title, department }) => {
  const { closeButton } = useStyles();

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
        <IconButton aria-label="close" className={closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {loading ? <MuiSkeleton /> : <DepartmentForm department={department} />}
        </DialogContent>
      </>
    </Dialog>
  );
};

export default DepartmentFormDialog;
