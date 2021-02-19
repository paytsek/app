import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';
import { CIVIL_STATUS } from '../../../../utils/globals';

const PersonalInformation = () => {
  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Personal Information" />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select id="gender" name="gender" value="">
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="nationality">Nationality</InputLabel>
              <Input autoComplete="off" type="text" id="nationality" name="nationality" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="civilStatus">Civil Status</InputLabel>
              <Select id="civilStatus" name="civilStatus" value="">
                {CIVIL_STATUS.map(({ name, value }) => (
                  <MenuItem value={value} key={value}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="numberOfQualifiedDependents">
                Qualified dependants
              </InputLabel>
              <Input
                autoComplete="off"
                type="number"
                id="numberOfQualifiedDependents"
                name="numberOfQualifiedDependents"
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="validId">Valid ID</InputLabel>
              <Input autoComplete="off" type="text" id="validId" name="validId" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="Valid ID number">Valid ID Number</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                id="validIdNumber"
                name="validIdNumber"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel htmlFor="placeOfIssue">Place of Issue</InputLabel>
              <Input
                autoComplete="off"
                type="number"
                id="placeOfIssue"
                name="placeOfIssue"
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth size="small">
              <TextField
                id="birthDate"
                label="Birth Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default PersonalInformation;
