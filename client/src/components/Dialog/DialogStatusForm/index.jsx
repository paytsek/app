import React, { useState, useEffect } from 'react';
import { Close as CloseIcon, Save } from '@material-ui/icons';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import moment from 'moment';

import { EMPLOYMENT_STATUS } from '../../../utils/globals';
import useStyles from './styles';

const DialogStatusForm = ({ open, handleClose, onSubmit, errors, loading, status }) => {
  const [employmentStatus, setEmploymentStatus] = useState('active');
  const [effectivityDate, setEffectivityDate] = useState(status.effectivityDate);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const statusData = { employmentStatus, effectivityDate };
    onSubmit(statusData);
  };

  const handleOnClose = () => {
    handleClose();
    setEmploymentStatus('active');
    setEffectivityDate('');
  };

  const { closeButton, formButton } = useStyles();

  useEffect(() => {
    if (!open) handleOnClose();

    if (open && Object.keys(status).length) {
      setEmploymentStatus(status.employmentStatus);
      setEffectivityDate(moment(status.effectivityDate).format('YYYY-MM-DD'));
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <>
        <DialogTitle>Add Status</DialogTitle>
        <IconButton aria-label="close" className={closeButton} onClick={handleOnClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={handleOnSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={8}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="employmentStatus">Employment Status</InputLabel>
                  <Select
                    name="employmentStatus"
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    error={!!errors.employmentStatus}
                  >
                    {EMPLOYMENT_STATUS.map((employmentStat) => (
                      <MenuItem key={employmentStat.value} value={employmentStat.value}>
                        {employmentStat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <FormControl fullWidth size="small">
                  <TextField
                    label="Effectivity Date"
                    type="date"
                    name="effectivityDate"
                    value={effectivityDate}
                    onChange={(e) => setEffectivityDate(e.target.value)}
                    error={!!errors.effectivityDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.effectivityDate && (
                    <FormHelperText error>{errors.effectivityDate}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <div className={formButton}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                disabled={loading}
                startIcon={<Save />}
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default DialogStatusForm;
