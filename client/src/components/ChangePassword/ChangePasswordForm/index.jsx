import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear } from '@material-ui/icons';

import useStyles from './styles';

const ChangePasswordForm = ({ history }) => {
  const { formButton } = useStyles();

  return (
    <form>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField placeholder="Current Password" label="Current Password" fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <TextField placeholder="New Password" label="New Password" fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            placeholder="New Password Confirmation"
            label="New Password Confirmation"
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <div className={formButton}>
        <Button color="primary" variant="contained" size="small" startIcon={<Save />}>
          Save
        </Button>
        <Button size="small" startIcon={<Undo />}>
          Reset
        </Button>
        <Button size="small" startIcon={<Clear />} onClick={() => history.push('/users')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default withRouter(ChangePasswordForm);
