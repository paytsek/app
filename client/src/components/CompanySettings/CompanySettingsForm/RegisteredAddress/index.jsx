import React from 'react';
import { Paper, TextField } from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const RegisteredAddress = ({ settings, onChange, errors }) => {
  const { street, city, country, zipCode } = settings;

  const { paper, fieldsContainer } = useStyles();

  return (
    <Paper className={paper} elevation={6}>
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
          error={!!errors['registeredAddress.street']}
          helperText={errors['registeredAddress.street']}
        />
        <TextField
          fullWidth
          margin="normal"
          label="City"
          placeholder="City"
          name="city"
          value={city}
          onChange={onChange}
          error={!!errors['registeredAddress.city']}
          helperText={errors['registeredAddress.city']}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Country"
          placeholder="Country"
          name="country"
          value={country}
          onChange={onChange}
          error={!!errors['registeredAddress.country']}
          helperText={errors['registeredAddress.country']}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Zip code"
          placeholder="Zip code"
          name="zipCode"
          value={zipCode}
          onChange={onChange}
          error={!!errors['registeredAddress.zipCode']}
          helperText={errors['registeredAddress.zipCode']}
        />
      </div>
    </Paper>
  );
};

export default RegisteredAddress;
