import React from 'react';
import { Grid, FormControl, TextField, InputAdornment } from '@material-ui/core';

import MuiSkeleton from '../MuiSkeleton';

const CompensationList = ({ compensations, loading, onChange, values }) =>
  (loading ? (
    <Grid item xs={12}>
      <MuiSkeleton />
    </Grid>
  ) : (
    compensations.map((compensation) => {
      const compensationValue =
        values && values.find((val) => val.other._id === compensation._id);

      return (
        <Grid item xs={12} key={compensation._id}>
          <FormControl fullWidth size="small">
            <TextField
              type="number"
              onChange={(e) => onChange(e, compensation._id)}
              defaultValue={(compensationValue && compensationValue.value) || ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{compensation.name}</InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
      );
    })
  ));

export default CompensationList;
