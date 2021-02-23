import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const BasicAdjustment = ({ basicAdjustment, onChange, errors }) => {
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
                error={!!errors.sssLoanBalance}
              />
              {errors.sssLoanBalance && (
                <FormHelperText error>{errors.sssLoanBalance}</FormHelperText>
              )}
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
                error={!!errors.hdmfLoanBalance}
              />
              {errors.hdmfLoanBalance && (
                <FormHelperText error>{errors.hdmfLoanBalance}</FormHelperText>
              )}
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
                error={!!errors.allowances}
              />
              {errors.allowances && (
                <FormHelperText error>{errors.allowances}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default BasicAdjustment;
