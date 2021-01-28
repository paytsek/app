import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import { ACCOUNTING_JOURNAL_ENTRIES } from '../../../../utils/globals';
import useStyles from '../styles';

const AccountingJournalEntries = ({ settings, onChange, errors }) => {
  const {
    taxableCompensation,
    thirteenthMonthPay,
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
            <FormControl fullWidth error={!!errors['accountingJournal.taxableCompensation']}>
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
              {errors['accountingJournal.taxableCompensation'] && (
                <FormHelperText error>
                  {errors['accountingJournal.taxableCompensation']}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.thirteenthMonthPay']}>
              <InputLabel htmlFor="thirteenthMonthPay">13th Month Pay</InputLabel>
              <Select
                id="thirteenthMonthPay"
                name="thirteenthMonthPay"
                value={thirteenthMonthPay}
                onChange={onChange}
              >
                {options()}
              </Select>
              {errors['accountingJournal.thirteenthMonthPay'] && (
                <FormHelperText error>
                  {errors['accountingJournal.thirteenthMonthPay']}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.nonTaxableCompensation']}>
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
              {errors['accountingJournal.nonTaxableCompensation'] && (
                <FormHelperText error>
                  {errors['accountingJournal.nonTaxableCompensation']}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.preTaxDeduction']}>
              <InputLabel htmlFor="preTaxDeduction">Pre-tax Deductions</InputLabel>
              <Select
                id="preTaxDeduction"
                name="preTaxDeduction"
                value={preTaxDeduction}
                onChange={onChange}
              >
                {options()}
              </Select>
              {errors['accountingJournal.preTaxDeduction'] && (
                <FormHelperText error>{errors['accountingJournal.preTaxDeduction']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.employeeBenefits']}>
              <InputLabel htmlFor="employeeBenefits">Employee Benefits (SSS/PHIC/HDMF)</InputLabel>
              <Select
                id="employeeBenefits"
                name="employeeBenefits"
                value={employeeBenefits}
                onChange={onChange}
              >
                {options()}
              </Select>
              {errors['accountingJournal.employeeBenefits'] && (
                <FormHelperText error>
                  {errors['accountingJournal.employeeBenefits']}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.sssPayable']}>
              <InputLabel htmlFor="sssPayable">SSS Payable</InputLabel>
              <Select id="sssPayable" name="sssPayable" value={sssPayable} onChange={onChange}>
                {options()}
              </Select>
              {errors['accountingJournal.sssPayable'] && (
                <FormHelperText error>{errors['accountingJournal.sssPayable']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.hdmfPayable']}>
              <InputLabel htmlFor="hdmfPayable">HDMF Payable</InputLabel>
              <Select id="hdmfPayable" name="hdmfPayable" value={hdmfPayable} onChange={onChange}>
                {options()}
              </Select>
              {errors['accountingJournal.hdmfPayable'] && (
                <FormHelperText error>{errors['accountingJournal.hdmfPayable']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.phicPayable']}>
              <InputLabel htmlFor="phicPayable">PHIC Payable</InputLabel>
              <Select id="phicPayable" name="phicPayable" value={phicPayable} onChange={onChange}>
                {options()}
              </Select>
              {errors['accountingJournal.phicPayable'] && (
                <FormHelperText error>{errors['accountingJournal.phicPayable']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.taxDue']}>
              <InputLabel htmlFor="taxDue">Tax Due</InputLabel>
              <Select id="taxDue" name="taxDue" value={taxDue} onChange={onChange}>
                {options()}
              </Select>
              {errors['accountingJournal.taxDue'] && (
                <FormHelperText error>{errors['accountingJournal.taxDue']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.reimbursement']}>
              <InputLabel htmlFor="reimbursement">Reimbursements</InputLabel>
              <Select
                id="reimbursement"
                name="reimbursement"
                value={reimbursement}
                onChange={onChange}
              >
                {options()}
              </Select>
              {errors['accountingJournal.reimbursement'] && (
                <FormHelperText error>{errors['accountingJournal.reimbursement']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.postTaxDeduction']}>
              <InputLabel htmlFor="postTaxDeduction">Post-tax Deductions</InputLabel>
              <Select
                id="postTaxDeduction"
                name="postTaxDeduction"
                value={postTaxDeduction}
                onChange={onChange}
              >
                {options()}
              </Select>
              {errors['accountingJournal.postTaxDeduction'] && (
                <FormHelperText error>
                  {errors['accountingJournal.postTaxDeduction']}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.netPay']}>
              <InputLabel htmlFor="netPay">Net Pay</InputLabel>
              <Select id="netPay" name="netPay" value={netPay} onChange={onChange}>
                {options()}
              </Select>
              {errors['accountingJournal.netPay'] && (
                <FormHelperText error>{errors['accountingJournal.netPay']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth error={!!errors['accountingJournal.deminimisBenefits']}>
              <InputLabel htmlFor="deminimisBenefits">De minimis benefit</InputLabel>
              <Select
                id="deminimisBenefits"
                name="deminimisBenefits"
                value={deminimisBenefits}
                onChange={onChange}
              >
                {options()}
              </Select>
              {errors['accountingJournal.deminimisBenefits'] && (
                <FormHelperText error>{errors['accountingJournal.deminimisBenefits']}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default AccountingJournalEntries;
