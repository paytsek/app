import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const EmployeeFunction = () => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Employee Function" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="department">Department</InputLabel>
              <Select id="department" name="department" value="">
                <MenuItem value="">Staff</MenuItem>
                <MenuItem value="">Executive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="position">Position</InputLabel>
              <Input autoComplete="off" type="text" id="position" name="position" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="workingDays">Working Days</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                id="workingDays"
                name="workingDays"
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="workingHours">Working Hours</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                id="workingHours"
                name="workingHours"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Primary Employer"
              labelPlacement="start"
              name="primaryEmployer"
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default EmployeeFunction;
