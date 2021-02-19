import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  TextField,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const BasicInformation = () => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Basic Information" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input autoComplete="off" type="email" id="email" name="email" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="tin">Employee Number</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                id="employeeNumber"
                name="employeeNumber"
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input autoComplete="off" type="text" id="firstName" name="firstName" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input autoComplete="off" type="text" id="lastName" name="lastName" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                id="hireDate"
                label="Hire Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                id="resignationDate"
                label="Resignation Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Pay remittances"
              labelPlacement="start"
              name="payRemittances"
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default BasicInformation;
