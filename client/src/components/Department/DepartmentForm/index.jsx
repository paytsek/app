import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo } from '@material-ui/icons';

import { updateDepartment } from '../../../redux/actions/departmentsActions';
import notification from '../../../utils/notification';
import useStyles from './styles';

const DepartmentForm = ({ department, errors, loading }) => {
  const [name, setName] = useState(department.name);

  const dispatch = useDispatch();

  const {
    company: { departments },
  } = useSelector((state) => state.companyDetails);

  const { formButton } = useStyles();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const exist = departments.find((dep) => dep.name === name && dep._id !== department._id);

    if (exist) {
      return dispatch(notification('warning', `${name} already exist`, dispatch));
    }
    return dispatch(updateDepartment(department._id, { name }));
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Grid container>
        <Grid item xs={12} md={7} lg={8}>
          <TextField
            placeholder="Department Name"
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
        <Button size="small" onClick={() => setName(department.name)} startIcon={<Undo />}>
          Reset
        </Button>
      </div>
    </form>
  );
};

export default withRouter(DepartmentForm);
