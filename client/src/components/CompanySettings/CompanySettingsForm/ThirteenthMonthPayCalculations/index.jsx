import React from 'react';
import {
  Typography,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

const thirteenthMonthPayCalculation = 'thirteenthMonthPayCalculation';

const ThirteenthMonthPayCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
  taxablePaysOptions,
  nonTaxablePaysOptions,
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
      {taxablePaysOptions && taxablePaysOptions.length > 0 ? (
        taxablePaysOptions.map((taxablePay) => (
          <FormControl fullWidth size="small" key={taxablePay._id}>
            <FormControlLabel
              label={taxablePay.name}
              name={taxablePay.name}
              control={<Checkbox color="primary" />}
              checked={taxablePays.includes(taxablePay._id)}
              value={taxablePay._id}
              onChange={(e) => onChangeTaxablePay(thirteenthMonthPayCalculation, e)}
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
      {nonTaxablePaysOptions && nonTaxablePaysOptions.length > 0 ? (
        nonTaxablePaysOptions.map((nonTaxablePay) => (
          <FormControl fullWidth size="small" key={nonTaxablePay._id}>
            <FormControlLabel
              label={nonTaxablePay.name}
              name={nonTaxablePay.name}
              control={<Checkbox color="primary" />}
              checked={nonTaxablePays.includes(nonTaxablePay._id)}
              value={nonTaxablePay._id}
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
