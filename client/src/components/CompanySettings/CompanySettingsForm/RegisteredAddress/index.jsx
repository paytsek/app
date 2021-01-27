import React from 'react';
import { Paper, TextField } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const RegisteredAddress = ({ settings, onChange }) => {
  const { street, city, country, zipCode } = settings;

  const { paper, fieldsContainer } = useStyles();

  return (
    <Paper className={paper}>
      <TitleBox title="Register Address" />
      <div className={fieldsContainer}>
        <TextField
          fullWidth
          margin="normal"
          label="Street"
          placeholder="Street"
          name="street"
          value={street}
          onChange={onChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="City"
          placeholder="City"
          name="city"
          value={city}
          onChange={onChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Country"
          placeholder="Country"
          name="country"
          value={country}
          onChange={onChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Zip code"
          placeholder="Zip code"
          name="zipCode"
          value={zipCode}
          onChange={onChange}
        />
      </div>
    </Paper>
  );
};

export default RegisteredAddress;
