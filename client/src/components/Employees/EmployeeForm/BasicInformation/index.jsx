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

const BasicInformation = ({ basicInformation, onChange }) => {
  const {
    email,
    employeeNumber,
    firstName,
    lastName,
    hireDate,
    resignationDate,
    rdoCode,
    payRemittances,
  } = basicInformation;

  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Basic Information" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
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
                value={employeeNumber}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                id="hireDate"
                label="Hire Date"
                type="date"
                name="hireDate"
                value={hireDate}
                onChange={onChange}
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
                value={resignationDate}
                name="resignationDate"
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="rdoCode">RDO code</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                id="rdoCode"
                name="rdoCode"
                value={rdoCode}
                onChange={onChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Pay remittances"
              labelPlacement="start"
              name="payRemittances"
              checked={payRemittances}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default BasicInformation;
