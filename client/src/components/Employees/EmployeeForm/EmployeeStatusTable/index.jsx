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

import {
  createStatus,
  getStatuses,
  deleteStatus,
  updateStatus,
} from '../../../../redux/actions/statusesActions';
import { STATUS_CREATE_RESET, STATUS_UPDATE_RESET } from '../../../../redux/types';
import useStyles from '../styles';

const EmployeeStatusTable = ({ match }) => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});

  const { id } = match.params;

  const dispatch = useDispatch();

  const { statuses } = useSelector((state) => state.statusesList);
  const { errors: statusesCreateErrors, success, loading } = useSelector(
    (state) => state.statusesCreate,
  );
  const { loading: statusesDeleteLoading } = useSelector((state) => state.statusesDelete);
  const {
    errors: statusesUpdateErrors,
    success: statusesUpdateSuccess,
    loading: statusesUpdateLoading,
  } = useSelector((state) => state.statusesUpdate);

  const { paper, fieldsContainer } = useStyles();

  const errors = { ...statusesCreateErrors, ...statusesUpdateErrors };

  const handleClose = () => {
    setOpen(false);
    setSelectedStatus({});
    dispatch({ type: STATUS_CREATE_RESET });
    dispatch({ type: STATUS_UPDATE_RESET });
  };

  const handleOnSubmit = (statusData) => {
    if (selectedStatus._id) {
      dispatch(updateStatus(id, selectedStatus._id, statusData));
    } else {
      dispatch(createStatus(id, statusData));
    }
  };

  const handleOnDeleteStatus = (statusId) => dispatch(deleteStatus(id, statusId));

  useEffect(() => {
    dispatch(getStatuses(id));
  }, []);

  useEffect(() => {
    if (success || statusesUpdateSuccess) {
      handleClose();
    }
  }, [success, statusesUpdateSuccess]);

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
        <List>
          {statuses.length > 0
            ? statuses.map((status) => (
              <ListItem key={status._id}>
                <ListItemText
                  primary={status.employmentStatus}
                  secondary={moment(status.effectivityDate).format('MMMM DD, YYYY')}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      setOpen(true);
                      setSelectedStatus(status);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    disabled={statusesDeleteLoading}
                    onClick={() => handleOnDeleteStatus(status._id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
            : null}
        </List>
      </Container>
      <DialogStatusForm
        open={open}
        handleClose={handleClose}
        onSubmit={handleOnSubmit}
        errors={errors}
        loading={loading || statusesUpdateLoading}
        status={selectedStatus}
      />
    </Paper>
  );
};

export default withRouter(EmployeeStatusTable);
