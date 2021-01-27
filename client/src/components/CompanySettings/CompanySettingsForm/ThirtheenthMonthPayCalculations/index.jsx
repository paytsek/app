import React, { Fragment } from 'react';
import { Typography, FormGroup, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const thirtheenthMonthPayCalculation = 'thirtheenthMonthPayCalculation';

const ThirtheenthMonthPayCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
}) => {
  const { deminimis, absences, taxablePays, nonTaxablePays } = settings;

  return (
    <Fragment>
      <Typography variant="subtitle1">13th Month pay Calculations</Typography>
      <FormGroup row>
        <FormControl size="small">
          <FormControlLabel
            label="De minimis"
            name="deminimis"
            checked={deminimis}
            onChange={e => onChangeCalculation(thirtheenthMonthPayCalculation, e)}
            control={<Checkbox color="primary" />}
          />
        </FormControl>
        <FormControl size="small">
          <FormControlLabel
            label="Absences"
            name="absences"
            checked={absences}
            onChange={e => onChangeCalculation(thirtheenthMonthPayCalculation, e)}
            control={<Checkbox color="primary" />}
          />
        </FormControl>
      </FormGroup>
      {/* taxable pays */}
      <Typography variant="subtitle1">Taxable Pays</Typography>
      {taxablePays && Object.keys(taxablePays).length > 0 ? (
        Object.keys(taxablePays).map(taxablePay => (
          <FormControl fullWidth size="small" key={taxablePay}>
            <FormControlLabel
              label={taxablePay}
              name={taxablePay}
              checked={taxablePays[taxablePay]}
              onChange={e => onChangeTaxablePay(thirtheenthMonthPayCalculation, e)}
              control={<Checkbox color="primary" />}
            />
          </FormControl>
        ))
      ) : (
        <Typography variant="body1" gutterBottom>
          No records
        </Typography>
      )}
      {/* non taxable pays */}
      <Typography variant="subtitle1">Non-Taxable Pays</Typography>
      {nonTaxablePays && Object.keys(nonTaxablePays).length > 0 ? (
        Object.keys(nonTaxablePays).map(nonTaxablePay => (
          <FormControl fullWidth size="small" key={nonTaxablePay}>
            <FormControlLabel
              label={nonTaxablePay}
              name={nonTaxablePay}
              control={<Checkbox color="primary" />}
              checked={nonTaxablePays[nonTaxablePay]}
              onChange={e => onChangeNonTaxablePay(thirtheenthMonthPayCalculation, e)}
            />
          </FormControl>
        ))
      ) : (
        <Typography variant="body1" gutterBottom>
          No records
        </Typography>
      )}
    </Fragment>
  );
};

export default ThirtheenthMonthPayCalculations;
