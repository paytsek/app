import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import TitleBox from '../../../common/TitleBox';

import notification from '../../../../utils/notification';
import useStyles from '../styles';

const Departments = ({ departments, onAdd, onDelete }) => {
  const [departmentName, setDepartmentName] = useState('');

  const dispatch = useDispatch();

  const { paper, fieldsContainer } = useStyles();

  const handleOnAdd = val => {
    const existDepartment = departments.includes(val);

    if (!val) {
      return dispatch(notification('warning', 'Please add a department name', dispatch));
    }

    if (existDepartment) {
      return dispatch(notification('warning', `${val} already exist`, dispatch));
    }
    onAdd(val);
    return setDepartmentName('');
  };

  return (
    <Paper className={paper}>
      <TitleBox title="Departments" />
      <div className={fieldsContainer}>
        <FormControl fullWidth size="small" margin="normal">
          <InputLabel htmlFor="department">Department</InputLabel>
          <Input
            id="department"
            name="departmentName"
            value={departmentName}
            onChange={e => setDepartmentName(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton color="primary" onClick={() => handleOnAdd(departmentName)}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {/* List of departments */}
        {departments.length > 0 ? (
          <List>
            {departments.map(department => (
              <ListItem key={department}>
                <ListItemText primary={department} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => onDelete(department)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : null}
      </div>
    </Paper>
  );
};

export default Departments;
