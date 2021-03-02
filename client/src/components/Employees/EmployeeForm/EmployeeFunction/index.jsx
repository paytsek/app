import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  FormHelperText,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';
import MuiSkeleton from '../../../MuiSkeleton';

import { getDepartments } from '../../../../redux/actions/departmentsActions';
import useStyles from '../styles';

const EmployeeFunction = ({ employeeFunction, onChange, errors }) => {
  const {
    department,
    position,
    workingHours,
    workingDays,
    primaryEmployer,
  } = employeeFunction;

  const dispatch = useDispatch();

  const { loading, departments } = useSelector((state) => state.departmentsList);

  const { paper, fieldsContainer } = useStyles();

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Employee Function" />
      <div className={fieldsContainer}>
        {loading ? (
          <MuiSkeleton />
        ) : (
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel htmlFor="department">Department</InputLabel>
                <Select
                  id="department"
                  name="department"
                  value={department}
                  onChange={onChange}
                  error={!!errors.department}
                >
                  {departments.length <= 0 ? (
                    <MenuItem value="">
                      No record to show
                    </MenuItem>
                  ) : (
                    departments.map((dep) => (
                      <MenuItem key={dep._id} value={dep._id}>
                        {dep.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
                {errors.department && (
                  <FormHelperText error>{errors.department}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel htmlFor="position">Position</InputLabel>
                <Input
                  autoComplete="off"
                  type="text"
                  id="position"
                  name="position"
                  value={position}
                  onChange={onChange}
                  error={!!errors.position}
                />
                {errors.position && (
                  <FormHelperText error>{errors.position}</FormHelperText>
                )}
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
                  value={workingDays}
                  onChange={onChange}
                  error={!!errors.workingDays}
                />
                {errors.workingDays && (
                  <FormHelperText error>{errors.workingDays}</FormHelperText>
                )}
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
                  value={workingHours}
                  onChange={onChange}
                  error={!!errors.workingHours}
                />
                {errors.workingHours && (
                  <FormHelperText error>{errors.workingHours}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} md={4}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Primary Employer"
                labelPlacement="start"
                name="primaryEmployer"
                checked={primaryEmployer}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        )}
      </div>
    </Paper>
  );
};

export default EmployeeFunction;
