import React from 'react';
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
} from '@material-ui/core';

import { EMPLOYMENTS_STATUS } from '../../../utils/globals';
import useStyles from './styles';

const DialogStatusForm = ({ open, handleClose }) => {
  const { closeButton, formButton } = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <>
        <DialogTitle>Add Status</DialogTitle>
        <IconButton aria-label="close" className={closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={8}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="employmentStatus">Employment Status</InputLabel>
                  <Select name="employmentStatus" value="">
                    {EMPLOYMENTS_STATUS.map((status) => (
                      <MenuItem key={status.value} value={status.value}>
                        {status.name}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <div className={formButton}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
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
