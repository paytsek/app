import React from 'react';
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

import useStyles from '../styles';

const CompanySettings = () => {
  const { paper, fieldsContainer } = useStyles();

  return (
    <Paper className={paper}>
      <TitleBox title="Company Settings" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="tin">Tax Identification Number</InputLabel>
              <Input id="tin" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="rdoCode">RDO Code</InputLabel>
              <Input id="rdoCode" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="category">Category of Withholding Agent</InputLabel>
              <Select id="category">
                <MenuItem>Government</MenuItem>
                <MenuItem>Private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="reportingBase">Reporting Base</InputLabel>
              <Select id="reportingBase" aria-describedby="reportingBaseHelper">
                <MenuItem>Payroll Cutoffs</MenuItem>
                <MenuItem>Payout Dates</MenuItem>
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
              <Select id="frequency">
                <MenuItem>Monthly</MenuItem>
                <MenuItem>Semi monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="firstCutOff">First Cutoff</InputLabel>
                  <Input id="firstCutOff" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="firstPayout">First Payout</InputLabel>
                  <Input id="firstPayout" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="secondCutOff">Second Cut Off</InputLabel>
                  <Input id="secondCutOff" />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                  <InputLabel htmlFor="secondPayout">Second Payout</InputLabel>
                  <Input id="secondPayout" />
                </FormControl>
              </Grid>
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
              <Select id="nightDifferential">
                <MenuItem>Disabled</MenuItem>
                <MenuItem>Percentage</MenuItem>
                <MenuItem>Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="nightDifferentialPercentage">Night Differential Percentage</InputLabel>
              <Input id="nightDifferentialPercentage" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {/* OVERTIME */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="overtime">Over time</InputLabel>
              <Select id="overtime">
                <MenuItem>Disabled</MenuItem>
                <MenuItem>Percentage</MenuItem>
                <MenuItem>Fixed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="overtimePay">Overtime Pay</InputLabel>
              <Input id="overtimePay" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="overtimeRestDayPay">Overtime Rest Day Pay</InputLabel>
              <Input id="overtimeRestDayPay" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        {/* HOLIDAY */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormControlLabel control={<Switch color="primary" />} label="Holiday" labelPlacement="start" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="regularHolidayPage">Regular Holiday Pay</InputLabel>
              <Input id="regularHolidayPage" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="specialHolidayPay">Special Holiday Pay</InputLabel>
              <Input id="specialHolidayPay" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={6} md={4} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="workingDays">Working Days</InputLabel>
              <Input id="workingDays" />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Tax Relief under Special Law of International Tax Treaty"
              labelPlacement="start"
            />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <FormControlLabel control={<Switch color="primary" />} label="Deminis Pay" labelPlacement="start" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <FormControlLabel control={<Switch color="primary" />} label="Email Notification" labelPlacement="start" />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default CompanySettings;
