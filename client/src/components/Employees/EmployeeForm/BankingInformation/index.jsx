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

const BankingInformation = ({ bankingInformation, onChange, errors }) => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Banking Information" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={9} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Banking Information</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                name="bankingInformation"
                value={bankingInformation}
                onChange={onChange}
                error={!!errors.bankingInformation}
              />
              {errors.bankingInformation && (
                <FormHelperText error>{errors.bankingInformation}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default BankingInformation;
