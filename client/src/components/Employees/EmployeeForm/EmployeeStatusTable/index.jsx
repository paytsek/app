import React from 'react';
import {
  Paper,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

import TitleBox from '../../../common/TitleBox';

import useStyles from '../styles';

const EmployeeStatusTable = () => {
  const { paper, fieldsContainer } = useStyles();

  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Status" />
      <div className={fieldsContainer}>
        <Button variant="contained" color="primary" size="small" startIcon={<Add />}>
          Add
        </Button>
      </div>
      <Container>
        <List>
          <ListItem>
            <ListItemText primary="Single-line item" secondary="Secondary text" />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          ,
        </List>
      </Container>
    </Paper>
  );
};

export default EmployeeStatusTable;
