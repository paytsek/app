import React from 'react';
import { Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import { ACCOUNTING_JOURNAL_ENTRIES } from '../../../../utils/globals';
import useStyles from '../styles';

const AccountingJournalEntries = ({ settings, onChange }) => {
  const {
    taxableCompensation,
    thirtheenthMonthPay,
    nonTaxableCompensation,
    preTaxDeduction,
    employeeBenefits,
    sssPayable,
    hdmfPayable,
    phicPayable,
    taxDue,
    reimbursement,
    postTaxDeduction,
    netPay,
    deminimisBenefits,
  } = settings;

  const { paper, fieldsContainer } = useStyles();

  const options = () => ACCOUNTING_JOURNAL_ENTRIES.map(({ name, value }) => (
      <MenuItem key={name} value={value}>
        {name}
      </MenuItem>
  ));

  return (
    <Paper className={paper}>
      <TitleBox title="Accounting Journal Entries" />
      <div className={fieldsContainer}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="taxableCompensation">
                Taxable Compensation (except 13th month)
              </InputLabel>
              <Select
                id="taxableCompensation"
                name="taxableCompensation"
                value={taxableCompensation}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="thirtheenthMonthPay">13th Month Pay</InputLabel>
              <Select
                id="thirtheenthMonthPay"
                name="thirtheenthMonthPay"
                value={thirtheenthMonthPay}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="nonTaxableCompensation">
                NonTaxable Compensation (except 13th month)
              </InputLabel>
              <Select
                id="nonTaxableCompensation"
                name="nonTaxableCompensation"
                value={nonTaxableCompensation}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="preTaxDeduction">Pre-tax Deductions</InputLabel>
              <Select
                id="preTaxDeduction"
                name="preTaxDeduction"
                value={preTaxDeduction}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="employeeBenefits">Employee Benefits (SSS/PHIC/HDMF)</InputLabel>
              <Select
                id="employeeBenefits"
                name="employeeBenefits"
                value={employeeBenefits}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="sssPayable">SSS Payable</InputLabel>
              <Select id="sssPayable" name="sssPayable" value={sssPayable} onChange={onChange}>
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="hdmfPayable">HDMF Payable</InputLabel>
              <Select id="hdmfPayable" name="hdmfPayable" value={hdmfPayable} onChange={onChange}>
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="phicPayable">PHIC Payable</InputLabel>
              <Select id="phicPayable" name="phicPayable" value={phicPayable} onChange={onChange}>
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="taxDue">Tax Due</InputLabel>
              <Select id="taxDue" name="taxDue" value={taxDue} onChange={onChange}>
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="reimbursement">Reimbursements</InputLabel>
              <Select
                id="reimbursement"
                name="reimbursement"
                value={reimbursement}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="postTaxDeduction">Post-tax Deductions</InputLabel>
              <Select
                id="postTaxDeduction"
                name="postTaxDeduction"
                value={postTaxDeduction}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="netPay">Net Pay</InputLabel>
              <Select id="netPay" name="netPay" value={netPay} onChange={onChange}>
                {options()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="deminimisBenefits">De minimis benefit</InputLabel>
              <Select
                id="deminimisBenefits"
                name="deminimisBenefits"
                value={deminimisBenefits}
                onChange={onChange}
              >
                {options()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default AccountingJournalEntries;
