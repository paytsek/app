import React from 'react';
import { Typography, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const sssCalculation = 'sssCalculation';

const SSSCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
  taxablePaysOptions,
  nonTaxablePaysOptions,
}) => {
  const { deminimis, nonTaxablePays, taxablePays } = settings;

  return (
    <>
      <Typography variant="subtitle1">SSS Calculations</Typography>
      <FormControl fullWidth size="small">
        <FormControlLabel
          label="De minimis"
          checked={deminimis}
          name="deminimis"
          onChange={(e) => onChangeCalculation(sssCalculation, e)}
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
              onChange={(e) => onChangeTaxablePay(sssCalculation, e)}
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
              onChange={(e) => onChangeNonTaxablePay(sssCalculation, e)}
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

export default SSSCalculations;
