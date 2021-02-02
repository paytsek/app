import React from 'react';
import { Typography, FormGroup, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const thirteenthMonthPayCalculation = 'thirteenthMonthPayCalculation';

const ThirteenthMonthPayCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
}) => {
  const { deminimis, absences, taxablePays, nonTaxablePays } = settings;

  return (
    <>
      <Typography variant="subtitle1">13th Month pay Calculations</Typography>
      <FormGroup row>
        <FormControl size="small">
          <FormControlLabel
            label="De minimis"
            name="deminimis"
            checked={deminimis}
            onChange={(e) => onChangeCalculation(thirteenthMonthPayCalculation, e)}
            control={<Checkbox color="primary" />}
          />
        </FormControl>
        <FormControl size="small">
          <FormControlLabel
            label="Absences"
            name="absences"
            checked={absences}
            onChange={(e) => onChangeCalculation(thirteenthMonthPayCalculation, e)}
            control={<Checkbox color="primary" />}
          />
        </FormControl>
      </FormGroup>
      {/* taxable pays */}
      <Typography variant="subtitle1">Taxable Pays</Typography>
      {taxablePays && Object.keys(taxablePays).length > 0 ? (
        Object.keys(taxablePays).map((taxablePay) => (
          <FormControl fullWidth size="small" key={taxablePay}>
            <FormControlLabel
              label={taxablePay}
              name={taxablePay}
              checked={taxablePays[taxablePay]}
              onChange={(e) => onChangeTaxablePay(thirteenthMonthPayCalculation, e)}
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
        Object.keys(nonTaxablePays).map((nonTaxablePay) => (
          <FormControl fullWidth size="small" key={nonTaxablePay}>
            <FormControlLabel
              label={nonTaxablePay}
              name={nonTaxablePay}
              control={<Checkbox color="primary" />}
              checked={nonTaxablePays[nonTaxablePay]}
              onChange={(e) => onChangeNonTaxablePay(thirteenthMonthPayCalculation, e)}
            />
          </FormControl>
        ))
      ) : (
        <Typography variant="body1" gutterBottom>
          No records
        </Typography>
      )}
    </>
  );
};

export default ThirteenthMonthPayCalculations;
