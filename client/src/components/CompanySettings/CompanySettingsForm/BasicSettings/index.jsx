import React, { Fragment } from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  FormHelperText,
  Divider,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';
import PercentageInput from '../../../common/PercentageInput';

import useStyles from '../styles';

const BasicSettings = ({ onChange, settings }) => {
  const {
    tin,
    rdoCode,
    atc,
    sssRegistrationNumber,
    phicNumber,
    hdmfNumber,
    category,
    reportingBase,
    frequency,
    firstCutOff,
    firstPayout,
    secondCutOff,
    secondPayout,
    nightDifferential,
    nightDifferentialPercentage,
    overtime,
    overtimePay,
    overtimeRestDayPay,
    holiday,
    regularHolidayPay,
    specialHolidayPay,
    workingDays,
    taxReliefInternationTaxTreaty,
    deminimis,
    emailNotification,
  } = settings;

  const { paper, fieldsContainer } = useStyles();

  return (
    <Paper className={paper}>
      <TitleBox title="Company Settings" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="tin">Tax Identification Number</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                id="tin"
                name="tin"
                value={tin}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="rdoCode">RDO Code</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                id="rdoCode"
                name="rdoCode"
                value={rdoCode}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="atc">ATC (Alphanumeric Tax Codes)</InputLabel>
              <Input autoComplete="off" id="atc" name="atc" value={atc} onChange={onChange} />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="sssRegistrationNumber">SSS Registration Number</InputLabel>
              <Input
                autoComplete="off"
                id="sssRegistrationNumber"
                name="sssRegistrationNumber"
                value={sssRegistrationNumber}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="phicNumber">PHIC Number</InputLabel>
              <Input
                autoComplete="off"
                id="phicNumber"
                name="phicNumber"
                value={phicNumber}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="hdmfNumber">HDMF Number</InputLabel>
              <Input
                autoComplete="off"
                id="hdmfNumber"
                name="hdmfNumber"
                value={hdmfNumber}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="category">Category of Withholding Agent</InputLabel>
              <Select id="category" name="category" value={category} onChange={onChange}>
                <MenuItem value="government">Government</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="reportingBase">Reporting Base</InputLabel>
              <Select
                id="reportingBase"
                aria-describedby="reportingBaseHelper"
                name="reportingBase"
                value={reportingBase}
                onChange={onChange}
              >
                <MenuItem value="payrollCutOffs">Payroll Cutoffs</MenuItem>
                <MenuItem value="payoutDates">Payout Dates</MenuItem>
              </Select>
              <FormHelperText id="reportingBaseHelper">
                Generated reports will be based on the option you will choose here.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {/* PAYROLL FREQUENCY */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="frequency">Payroll Frequency</InputLabel>
              <Select id="frequency" name="frequency" value={frequency} onChange={onChange}>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="semiMonthly">Semi monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="firstCutOff">First Cutoff</InputLabel>
                  <Input
                    id="firstCutOff"
                    type="number"
                    name="firstCutOff"
                    value={firstCutOff}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="firstPayout">First Payout</InputLabel>
                  <Input
                    type="number"
                    id="firstPayout"
                    name="firstPayout"
                    value={firstPayout}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              {frequency === 'semiMonthly' && (
                <Fragment>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel htmlFor="secondCutOff">Second CutOff</InputLabel>
                      <Input
                        id="secondCutOff"
                        type="number"
                        name="secondCutOff"
                        value={secondCutOff}
                        onChange={onChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel htmlFor="secondPayout">Second Payout</InputLabel>
                      <Input
                        id="secondPayout"
                        type="number"
                        name="secondPayout"
                        value={secondPayout}
                        onChange={onChange}
                      />
                    </FormControl>
                  </Grid>
                </Fragment>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {/* NIGHT DIFFERENTIAL */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="nightDifferential">Night Differential</InputLabel>
              <Select
                id="nightDifferential"
                name="nightDifferential"
                value={nightDifferential}
                onChange={onChange}
              >
                <MenuItem value="disabled">Disabled</MenuItem>
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {nightDifferential === 'percentage' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel htmlFor="nightDifferentialPercentage">
                  Night Differential Percentage
                </InputLabel>
                <PercentageInput
                  id="nightDifferentialPercentage"
                  name="nightDifferentialPercentage"
                  value={nightDifferentialPercentage}
                  onChange={onChange}
                />
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {/* OVERTIME */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="overtime">Over time</InputLabel>
              <Select id="overtime" name="overtime" value={overtime} onChange={onChange}>
                <MenuItem value="disabled">Disabled</MenuItem>
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {overtime === 'hourly' && (
            <Fragment>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="overtimePay">Overtime Pay</InputLabel>
                  <PercentageInput
                    id="overtimePay"
                    name="overtimePay"
                    value={overtimePay}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="overtimeRestDayPay">Overtime Rest Day Pay</InputLabel>
                  <PercentageInput
                    id="overtimeRestDayPay"
                    name="overtimeRestDayPay"
                    value={overtimeRestDayPay}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
            </Fragment>
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {/* HOLIDAY */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Holiday"
              labelPlacement="start"
              name="holiday"
              checked={holiday}
              onChange={onChange}
            />
          </Grid>
          {holiday && (
            <Fragment>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="regularHolidayPay">Regular Holiday Pay</InputLabel>
                  <PercentageInput
                    id="regularHolidayPay"
                    name="regularHolidayPay"
                    value={regularHolidayPay}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="specialHolidayPay">Special Holiday Pay</InputLabel>
                  <PercentageInput
                    id="specialHolidayPay"
                    name="specialHolidayPay"
                    value={specialHolidayPay}
                    onChange={onChange}
                  />
                </FormControl>
              </Grid>
            </Fragment>
          )}
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={6} md={4} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="workingDays">Working Days</InputLabel>
              <Input
                type="number"
                id="workingDays"
                name="workingDays"
                value={workingDays}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Tax Relief under Special Law of International Tax Treaty"
              labelPlacement="start"
              name="taxReliefInternationTaxTreaty"
              checked={taxReliefInternationTaxTreaty}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Deminis Pay"
              labelPlacement="start"
              name="deminimis"
              value={deminimis}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Email Notification"
              labelPlacement="start"
              name="emailNotification"
              value={emailNotification}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default BasicSettings;
