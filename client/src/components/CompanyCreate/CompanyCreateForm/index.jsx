import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';

import useStyles from './styles';

const CompanyCreateForm = ({ history }) => {
  const { formButton } = useStyles();

  return (
    <form>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField placeholder="Company Name" label="Name" fullWidth margin="normal" />
        </Grid>
      </Grid>
      <div className={formButton}>
        <Button color="primary" variant="contained" size="small" startIcon={<Save />}>
          Save
        </Button>
        <Button size="small" startIcon={<Clear />} onClick={() => history.push('/companies')}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default withRouter(CompanyCreateForm);
