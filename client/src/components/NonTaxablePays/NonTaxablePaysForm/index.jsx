import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo } from '@material-ui/icons';

import { updateNonTaxablePay } from '../../../redux/actions/nonTaxablePaysActions';
import notification from '../../../utils/notification';
import useStyles from './styles';

const NonTaxablePaysForm = ({ nonTaxablePay, loading, errors }) => {
  const [name, setName] = useState(nonTaxablePay.name);

  const dispatch = useDispatch();

  const { nonTaxablePays } = useSelector((state) => state.nonTaxablePaysList);

  const { formButton } = useStyles();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const exist = nonTaxablePays.find(
      (nonTaxable) => nonTaxable.name === name && nonTaxable._id !== nonTaxablePay._id,
    );

    if (exist) {
      return dispatch(notification('warning', `${name} already exist`, dispatch));
    }
    return dispatch(updateNonTaxablePay(nonTaxablePay._id, { name }));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            placeholder="Non Taxable Pay Name"
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={name}
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
      </Grid>
      <div className={formButton}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="small"
          disabled={loading}
          startIcon={<Save />}
        >
          Save
        </Button>
        <Button size="small" onClick={() => setName(nonTaxablePay.name)} startIcon={<Undo />}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default withRouter(NonTaxablePaysForm);
