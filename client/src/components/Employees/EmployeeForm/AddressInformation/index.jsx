import React from 'react';
import {
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const AddressInformation = ({ title, address, onChange, addressType, errors }) => {
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
                error={!!errors.street}
              />
              {errors.street && <FormHelperText error>{errors.street}</FormHelperText>}
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
                error={!!errors.city}
              />
              {errors.city && <FormHelperText error>{errors.city}</FormHelperText>}
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
                error={!!errors.country}
              />
              {errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
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
                error={!!errors.zipCode}
              />
              {errors.zipCode && <FormHelperText error>{errors.zipCode}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default AddressInformation;
