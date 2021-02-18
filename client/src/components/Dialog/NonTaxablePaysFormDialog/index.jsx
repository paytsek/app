import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import NonTaxablePaysForm from '../../NonTaxablePays/NonTaxablePaysForm';

import useStyles from './styles';

const NonTaxablePayFormDialog = ({ handleClose, open, title, nonTaxablePay, errors, loading }) => {
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
          <NonTaxablePaysForm
            nonTaxablePay={nonTaxablePay}
            errors={errors}
            loading={loading}
          />
        </DialogContent>
      </>
    </Dialog>
  );
};

export default NonTaxablePayFormDialog;
