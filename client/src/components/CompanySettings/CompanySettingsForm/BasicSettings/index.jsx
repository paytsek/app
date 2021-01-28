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

const BasicSettings = ({ onChange, settings, errors }) => {
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
            <FormControl fullWidth size="small" error={!!errors.category}>
              <InputLabel htmlFor="category">Category of Withholding Agent</InputLabel>
              <Select id="category" name="category" value={category} onChange={onChange}>
                <MenuItem value="government">Government</MenuItem>
                <MenuItem value="private">Private</MenuItem>
              </Select>
              {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small" error={!!errors.reportingBase}>
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
              <FormHelperText id="reportingBaseHelper" error={!!errors.reportingBase}>
                {errors.reportingBase
                  ? errors.reportingBase
                  : 'Generated reports will be based on the option you will choose here.'}
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
            <FormControl fullWidth size="small" error={!!errors.frequency}>
              <InputLabel htmlFor="frequency">Payroll Frequency</InputLabel>
              <Select id="frequency" name="frequency" value={frequency} onChange={onChange}>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="semiMonthly">Semi monthly</MenuItem>
              </Select>
              {errors.frequency && <FormHelperText error>{errors.frequency}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small" error={!!errors.firstCutOff}>
                  <InputLabel htmlFor="firstCutOff">First Cutoff</InputLabel>
                  <Input
                    id="firstCutOff"
                    type="number"
                    name="firstCutOff"
                    value={firstCutOff}
                    onChange={onChange}
                    error={!!errors.firstCutOff}
                  />
                  {errors.firstCutOff && (
                    <FormHelperText error>{errors.firstCutOff}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small" error={!!errors.firstPayout}>
                  <InputLabel htmlFor="firstPayout">First Payout</InputLabel>
                  <Input
                    type="number"
                    id="firstPayout"
                    name="firstPayout"
                    value={firstPayout}
                    onChange={onChange}
                  />
                  {errors.firstPayout && <FormHelperText>{errors.firstPayout}</FormHelperText>}
                </FormControl>
              </Grid>
              {frequency === 'semiMonthly' && (
                <Fragment>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small" error={!!errors.secondCutOff}>
                      <InputLabel htmlFor="secondCutOff">Second CutOff</InputLabel>
                      <Input
                        id="secondCutOff"
                        type="number"
                        name="secondCutOff"
                        value={secondCutOff}
                        onChange={onChange}
                      />
                      {errors.secondCutOff && (
                        <FormHelperText error>{errors.secondCutOff}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth size="small" error={!!errors.secondPayout}>
                      <InputLabel htmlFor="secondPayout">Second Payout</InputLabel>
                      <Input
                        id="secondPayout"
                        type="number"
                        name="secondPayout"
                        value={secondPayout}
                        onChange={onChange}
                      />
                      {errors.secondPayout && (
                        <FormHelperText error>{errors.secondPayout}</FormHelperText>
                      )}
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
            <FormControl fullWidth size="small" error={!!errors.nightDifferential}>
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
              {errors.nightDifferential && (
                <FormHelperText error>{errors.nightDifferential}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          {nightDifferential === 'percentage' && (
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small" error={!!errors.nightDifferentialPercentage}>
                <InputLabel htmlFor="nightDifferentialPercentage">
                  Night Differential Percentage
                </InputLabel>
                <PercentageInput
                  id="nightDifferentialPercentage"
                  name="nightDifferentialPercentage"
                  value={nightDifferentialPercentage}
                  onChange={onChange}
                />
                {errors.nightDifferentialPercentage && (
                  <FormHelperText error>{errors.nightDifferentialPercentage}</FormHelperText>
                )}
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
            <FormControl fullWidth size="small" error={!!errors.overtime}>
              <InputLabel htmlFor="overtime">Over time</InputLabel>
              <Select id="overtime" name="overtime" value={overtime} onChange={onChange}>
                <MenuItem value="disabled">Disabled</MenuItem>
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="fixed">Fixed</MenuItem>
              </Select>
              {errors.overtime && <FormHelperText error>{errors.overtime}</FormHelperText>}
            </FormControl>
          </Grid>
          {overtime === 'hourly' && (
            <Fragment>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small" error={!!errors.overtimePay}>
                  <InputLabel htmlFor="overtimePay">Overtime Pay</InputLabel>
                  <PercentageInput
                    id="overtimePay"
                    name="overtimePay"
                    value={overtimePay}
                    onChange={onChange}
                  />
                  {errors.overtimePay && (
                    <FormHelperText error>{errors.overtimePay}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small" error={!!errors.overtimeRestDayPay}>
                  <InputLabel htmlFor="overtimeRestDayPay">Overtime Rest Day Pay</InputLabel>
                  <PercentageInput
                    id="overtimeRestDayPay"
                    name="overtimeRestDayPay"
                    value={overtimeRestDayPay}
                    onChange={onChange}
                  />
                  {errors.overtimeRestDayPay && (
                    <FormHelperText error>{errors.overtimeRestDayPay}</FormHelperText>
                  )}
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
            {errors.holiday && <FormHelperText error>{errors.holiday}</FormHelperText>}
          </Grid>
          {holiday && (
            <Fragment>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small" error={!!errors.regularHolidayPay}>
                  <InputLabel htmlFor="regularHolidayPay">Regular Holiday Pay</InputLabel>
                  <PercentageInput
                    id="regularHolidayPay"
                    name="regularHolidayPay"
                    value={regularHolidayPay}
                    onChange={onChange}
                  />
                  {errors.regularHolidayPay && (
                    <FormHelperText error>{errors.regularHolidayPay}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small" error={!!errors.specialHolidayPay}>
                  <InputLabel htmlFor="specialHolidayPay">Special Holiday Pay</InputLabel>
                  <PercentageInput
                    id="specialHolidayPay"
                    name="specialHolidayPay"
                    value={specialHolidayPay}
                    onChange={onChange}
                  />
                  {errors.specialHolidayPay && (
                    <FormHelperText error>{errors.specialHolidayPay}</FormHelperText>
                  )}
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
            <FormControl fullWidth size="small" error={!!errors.workingDays}>
              <InputLabel htmlFor="workingDays">Working Days</InputLabel>
              <Input
                type="number"
                id="workingDays"
                name="workingDays"
                value={workingDays}
                onChange={onChange}
              />
              {errors.workingDays && <FormHelperText error>{errors.workingDays}</FormHelperText>}
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
            {errors.taxReliefInternationTaxTreaty && (
              <FormHelperText error>{errors.taxReliefInternationTaxTreaty}</FormHelperText>
            )}
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
            {errors.deminimis && <FormHelperText error>{errors.deminimis}</FormHelperText>}
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
