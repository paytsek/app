import React from 'react';
import { Typography, FormControlLabel, FormControl, Checkbox } from '@material-ui/core';

const phicCalculation = 'phicCalculation';

const PhicCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
  taxablePaysOptions,
  nonTaxablePaysOptions,
}) => {
  const { deminimis, taxablePays, nonTaxablePays } = settings;

  return (
    <>
      <Typography variant="subtitle1">PHIC Calculations</Typography>
      <FormControl fullWidth size="small">
        <FormControlLabel
          label="De minimis"
          name="deminimis"
          checked={deminimis}
          onChange={(e) => onChangeCalculation(phicCalculation, e)}
          control={<Checkbox color="primary" />}
        />
      </FormControl>
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
              onChange={(e) => onChangeTaxablePay(phicCalculation, e)}
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
              onChange={(e) => onChangeNonTaxablePay(phicCalculation, e)}
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

export default PhicCalculations;
