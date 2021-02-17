import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormHelperText,
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

import TitleBox from '../../../common/TitleBox';
import DepartmentFormDialog from '../../../Dialog/DepartmentFormDialog';
import MuiSkeleton from '../../../MuiSkeleton';

import { DEPARTMENT_UPDATE_RESET } from '../../../../redux/types';
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
} from '../../../../redux/actions/departmentsActions';
import notification from '../../../../utils/notification';
import useStyles from '../styles';

const Departments = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({});

  const dispatch = useDispatch();

  const { errors, loading } = useSelector((state) => state.departmentCreate);
  const { departments, loading: departmentsListLoading } = useSelector(
    (state) => state.departmentsList,
  );
  const { success, errors: departmentUpdateErrors, loading: departmentUpdateLoading } = useSelector(
    (state) => state.departmentUpdate,
  );
  const { loading: departmentDeleteLoading } = useSelector((state) => state.departmentDelete);

  const { paper, fieldsContainer } = useStyles();

  const handleOnAdd = (val) => {
    const existDepartment = departments
      .map((department) => department.name.toLowerCase())
      .includes(val.toLowerCase());

    if (!val) {
      return dispatch(notification('warning', 'Please add a department name', dispatch));
    }

    if (existDepartment) {
      return dispatch(notification('warning', `${val} already exist`, dispatch));
    }
    dispatch(createDepartment({ name }));
    return setName('');
  };

  const handleOnClose = () => {
    setSelectedDepartment({});
    setOpen(false);
    dispatch({ type: DEPARTMENT_UPDATE_RESET });
  };

  const handleOnOpen = (dep) => {
    setSelectedDepartment(dep);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  useEffect(() => {
    if (success) {
      handleOnClose();
    }
  }, [success]);

  if (departmentsListLoading) return <MuiSkeleton />;

  return (
    <>
      <Paper className={paper} elevation={6}>
        <TitleBox title="Departments" />
        <div className={fieldsContainer}>
          <FormControl fullWidth size="small" margin="normal" error={!!errors.name}>
            <InputLabel htmlFor="departments">Department</InputLabel>
            <Input
              id="departments"
              name="departmentName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={() => handleOnAdd(name)} disabled={loading}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
            {errors.name && <FormHelperText error={!!errors.name}>{errors.name}</FormHelperText>}
          </FormControl>
          {/* List of departments */}
          {departments.length > 0 ? (
            <List>
              {departments.map((department) => (
                <ListItem key={department._id}>
                  <ListItemText primary={department.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOnOpen(department)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      disabled={departmentDeleteLoading}
                      onClick={() => dispatch(deleteDepartment(department._id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </Paper>
      <DepartmentFormDialog
        open={open}
        handleClose={handleOnClose}
        department={selectedDepartment}
        title="Edit a department"
        errors={departmentUpdateErrors}
        loading={departmentUpdateLoading}
      />
    </>
  );
};

export default Departments;
