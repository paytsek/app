import React, { Fragment } from 'react';
import { Typography, FormGroup, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const ThirtheenthMonthPayCalculations = () => (
  <Fragment>
    <Typography variant="subtitle1">13th Month pay Calculations</Typography>
    <FormGroup row>
      <FormControl size="small">
        <FormControlLabel label="De minimis" control={<Checkbox color="primary" />} />
      </FormControl>
      <FormControl size="small">
        <FormControlLabel label="Absences" control={<Checkbox color="primary" />} />
      </FormControl>
    </FormGroup>
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

export default ThirtheenthMonthPayCalculations;
