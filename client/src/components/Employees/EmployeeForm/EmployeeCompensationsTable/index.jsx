import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const EmployeeCompensationsTable = () => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Compensations" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item xs={12} />
        </Grid>
      </div>
    </Paper>
  );
};

export default EmployeeCompensationsTable;
