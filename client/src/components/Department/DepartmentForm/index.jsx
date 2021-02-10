import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';

import useStyles from './styles';

const DepartmentForm = ({ department }) => {
  const [name, setName] = useState(department.name);

  const { formButton } = useStyles();

  return (
    <form>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            placeholder="Company Name"
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
      </Grid>
      <div className={formButton}>
        <Button type="submit" color="primary" variant="contained" size="small" startIcon={<Save />}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default withRouter(DepartmentForm);
