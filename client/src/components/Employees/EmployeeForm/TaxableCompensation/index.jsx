import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  TextField,
  InputAdornment,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const TaxableCompensation = () => {
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
                    <InputAdornment position="start">Basic Pay</InputAdornment>
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
                    <InputAdornment position="start">Transportation</InputAdornment>
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
                    <InputAdornment position="start">Rice</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default TaxableCompensation;
