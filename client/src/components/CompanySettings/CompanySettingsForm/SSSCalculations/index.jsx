import React, { Fragment } from 'react';
import { Typography, FormControl, FormControlLabel, Checkbox } from '@material-ui/core';

const sssCalculation = 'sssCalculation';

const SSSCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
}) => {
  const { deminimis, taxablePays, nonTaxablePays } = settings;

  return (
    <Fragment>
      <Typography variant="subtitle1">SSS Calculations</Typography>
      <FormControl fullWidth size="small">
        <FormControlLabel
          label="De minimis"
          checked={deminimis}
          name="deminimis"
          onChange={e => onChangeCalculation(sssCalculation, e)}
          control={<Checkbox color="primary" />}
        />
      </FormControl>
      {/* taxable pays */}
      <Typography variant="subtitle1">Taxable Pays</Typography>
      {taxablePays && Object.keys(taxablePays).length > 0 ? (
        Object.keys(taxablePays).map(taxablePay => (
          <FormControl fullWidth size="small" key={taxablePay}>
            <FormControlLabel
              label={taxablePay}
              name={taxablePay}
              control={<Checkbox color="primary" />}
              checked={taxablePays[taxablePay]}
              onChange={e => onChangeTaxablePay(sssCalculation, e)}
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
              onChange={e => onChangeNonTaxablePay(sssCalculation, e)}
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

export default SSSCalculations;
