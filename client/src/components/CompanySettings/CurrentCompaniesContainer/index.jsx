import React from 'react';
import { Grid } from '@material-ui/core';

import CurrentCompaniesCard from '../CurrentCampaniesCard';

const CurrentCompaniesContainer = () => (
  <Grid container spacing={4} justify="space-between">
    <Grid item>
      <CurrentCompaniesCard />
    </Grid>
    <Grid item>
      <CurrentCompaniesCard />
    </Grid>
    <Grid item>
      <CurrentCompaniesCard />
    </Grid>
  </Grid>
);

export default CurrentCompaniesContainer;
