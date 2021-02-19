import React from 'react';
import { Grid } from '@material-ui/core';

import BasicInformation from './BasicInformation';

import useStyles from './styles';

const EmployeeForm = () => {
  const { gridContainer } = useStyles();

  return (
    <Grid container spacing={3} className={gridContainer}>
      <Grid item xs={12}>
        <BasicInformation />
      </Grid>
    </Grid>
  );
};

export default EmployeeForm;
