import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear, Delete } from '@material-ui/icons';

import useStyles from './styles';

const CurrentUserProfileForm = ({ history }) => {
  const { formButton } = useStyles();

  return (
    <form>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField placeholder="Email" label="Email" fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <TextField placeholder="First Name" label="First Name" fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <TextField placeholder="Last Name" label="Last Name" fullWidth margin="normal" />
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
        <Button size="small" variant="contained" color="secondary" startIcon={<Delete />}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default withRouter(CurrentUserProfileForm);
