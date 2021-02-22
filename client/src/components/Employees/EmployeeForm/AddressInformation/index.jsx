import React from 'react';
import { Paper, Grid, FormControl, InputLabel, Input } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const AddressInformation = ({ title, address, onChange, addressType }) => {
  const { street, city, country, zipCode } = address;

  const { paper, fieldsContainer } = useStyles();
  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title={title} />
      <div className={fieldsContainer}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Street</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                name="street"
                value={street}
                onChange={(e) => onChange(e, addressType)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>City</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                name="city"
                value={city}
                onChange={(e) => onChange(e, addressType)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Country</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                name="country"
                value={country}
                onChange={(e) => onChange(e, addressType)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Zip code</InputLabel>
              <Input
                autoComplete="off"
                type="text"
                name="zipCode"
                value={zipCode}
                onChange={(e) => onChange(e, addressType)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default AddressInformation;
