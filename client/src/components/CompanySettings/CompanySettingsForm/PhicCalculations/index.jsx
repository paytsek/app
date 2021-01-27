import React, { Fragment } from 'react';
import { Typography, FormControlLabel, FormControl, Checkbox } from '@material-ui/core';

const phicCalculation = 'phicCalculation';

const PhicCalculations = ({
  settings,
  onChangeCalculation,
  onChangeTaxablePay,
  onChangeNonTaxablePay,
}) => {
  const { deminimis, taxablePays, nonTaxablePays } = settings;

  return (
    <Fragment>
      <Typography variant="subtitle1">PHIC Calculations</Typography>
      <FormControl fullWidth size="small">
        <FormControlLabel
          label="De minimis"
          name="deminimis"
          value={deminimis}
          onChange={e => onChangeCalculation(phicCalculation, e)}
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
              checked={taxablePays[taxablePay]}
              onChange={e => onChangeTaxablePay(phicCalculation, e)}
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
              onChange={e => onChangeNonTaxablePay(phicCalculation, e)}
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

export default PhicCalculations;
