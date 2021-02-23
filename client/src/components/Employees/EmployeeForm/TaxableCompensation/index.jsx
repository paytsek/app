import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  FormControl,
  TextField,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';
import CompensationsList from '../../../CompensationsList';

import { getTaxablePays } from '../../../../redux/actions/taxablePaysActions';
import useStyles from '../styles';

const TaxableCompensation = ({ taxableCompensation, onChange, setDefault, errors }) => {
  const { basicPay } = taxableCompensation;

  const dispatch = useDispatch();

  const { taxablePays, loading, success } = useSelector((state) => state.taxablePaysList);

  const { paper, fieldsContainer } = useStyles();

  useEffect(() => {
    dispatch(getTaxablePays());
  }, []);

  useEffect(() => {
    if (success) {
      setDefault(taxablePays);
    }
  }, [success]);

  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Taxable Compensation" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                type="number"
                name="basicPay"
                value={basicPay}
                onChange={onChange}
                error={!!errors.basicPay}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Basic Pay</InputAdornment>
                  ),
                }}
              />
              {errors.basicPay && (
                <FormHelperText error>{errors.basicPay}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <CompensationsList
            loading={loading}
            compensations={taxablePays}
            onChange={onChange}
          />
        </Grid>
      </div>
    </Paper>
  );
};

export default TaxableCompensation;
