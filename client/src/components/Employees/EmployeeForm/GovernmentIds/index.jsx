import React from 'react';
import { Paper, Grid, FormControl, InputLabel, Input } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const GovernmentIds = () => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Government IDs" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>SSS Number</InputLabel>
              <Input autoComplete="off" type="text" name="sssNumber" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>PHIC Number</InputLabel>
              <Input autoComplete="off" type="text" name="phicNumber" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>HDMF Number</InputLabel>
              <Input autoComplete="off" type="text" name="hdmfNumber" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Tax Identification</InputLabel>
              <Input autoComplete="off" type="text" name="tin" />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default GovernmentIds;
