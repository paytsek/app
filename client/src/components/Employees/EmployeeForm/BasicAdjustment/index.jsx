import React from 'react';
import { Paper, Grid, FormControl, InputLabel, Input } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const BasicAdjustment = ({ basicAdjustment, onChange }) => {
  const { sssLoanBalance, hdmfLoanBalance, allowances } = basicAdjustment;

  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Basic Adjustment" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>SSS Loan Balanace</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                name="sssLoanBalance"
                value={sssLoanBalance}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>HDMF Loan Balance</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                name="hdmfLoanBalance"
                value={hdmfLoanBalance}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Allowances</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                name="allowances"
                value={allowances}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default BasicAdjustment;
