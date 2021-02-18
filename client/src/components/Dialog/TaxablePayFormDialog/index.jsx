import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import TaxablePaysForm from '../../TaxablePays/TaxablePaysForm';

import useStyles from './styles';

const TaxablePayFormDialog = ({ handleClose, open, title, taxablePay, errors, loading }) => {
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
          <TaxablePaysForm taxablePay={taxablePay} errors={errors} loading={loading} />
        </DialogContent>
      </>
    </Dialog>
  );
};

export default TaxablePayFormDialog;
