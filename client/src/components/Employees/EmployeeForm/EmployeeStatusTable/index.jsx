import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
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
import DialogStatusForm from '../../../Dialog/DialogStatusForm';

import { getStatuses } from '../../../../redux/actions/statusesActions';
import useStyles from '../styles';

const EmployeeStatusTable = ({ match }) => {
  const [open, setOpen] = useState(false);

  const { id } = match.params;

  const dispatch = useDispatch();

  const { statuses } = useSelector((state) => state.statusesList);

  const { paper, fieldsContainer } = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getStatuses(id));
  }, []);

  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Status" />
      <div className={fieldsContainer}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setOpen(true)}
          startIcon={<Add />}
        >
          Add
        </Button>
      </div>
      <Container>
        {statuses.length > 0 ? (
          <List>
            {statuses.map((status) => (
              <ListItem key={status._id}>
                <ListItemText
                  primary={status.employmentStatus}
                  secondary={moment(status.effectivityDate).format('MMMM DD, YYYY')}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : null}
      </Container>
      <DialogStatusForm open={open} handleClose={handleClose} />
    </Paper>
  );
};

export default withRouter(EmployeeStatusTable);
