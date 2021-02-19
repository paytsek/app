import React from 'react';
import { Paper, Grid, FormControl, TextField, InputAdornment } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const NonTaxableCompensation = () => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Taxable Compensation" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">De minimis</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Food</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">Allowance</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default NonTaxableCompensation;
