import React, { Fragment } from 'react';
import { Typography, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const SSSCalculations = () => (
  <Fragment>
    <Typography variant="subtitle1">SSS Calculations</Typography>
    <FormControl fullWidth size="small">
      <FormControlLabel label="De minimis" control={<Checkbox color="primary" />} />
    </FormControl>
    {/* taxable pays */}
    <Typography variant="subtitle1">Taxable Pays</Typography>
    <FormControl fullWidth size="small">
      <FormControlLabel label="Playstation" control={<Checkbox color="primary" />} />
    </FormControl>
    <FormControl fullWidth size="small">
      <FormControlLabel label="Allowance" control={<Checkbox color="primary" />} />
    </FormControl>
    {/* non taxable pays */}
    <Typography variant="subtitle1">Non-Taxable Pays</Typography>
    <FormControl fullWidth size="small">
      <FormControlLabel label="Playstation" control={<Checkbox color="primary" />} />
    </FormControl>
    <FormControl fullWidth size="small">
      <FormControlLabel label="Allowance" control={<Checkbox color="primary" />} />
    </FormControl>
    <FormControl fullWidth size="small">
      <FormControlLabel label="Beer" control={<Checkbox color="primary" />} />
    </FormControl>
  </Fragment>
);

export default SSSCalculations;
