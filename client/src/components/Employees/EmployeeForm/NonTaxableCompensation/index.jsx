import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, Grid, FormControl, TextField, InputAdornment } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';
import CompensationsList from '../../../CompensationsList';

import { getNonTaxablePays } from '../../../../redux/actions/nonTaxablePaysActions';
import useStyles from '../styles';

const NonTaxableCompensation = ({ nonTaxableCompensation, onChange }) => {
  const { deminimis } = nonTaxableCompensation;

  const dispatch = useDispatch();

  const { nonTaxablePays, loading } = useSelector((state) => state.nonTaxablePaysList);

  useEffect(() => {
    dispatch(getNonTaxablePays());
  }, []);

  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Non Taxable Compensation" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                type="number"
                name="deminimis"
                value={deminimis}
                onChange={onChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">De minimis</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <CompensationsList
            loading={loading}
            compensations={nonTaxablePays}
            onChange={onChange}
          />
        </Grid>
      </div>
    </Paper>
  );
};

export default NonTaxableCompensation;
