import React, { useState, useEffect } from 'react';
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
import DialogBasicCompensation from '../../../Dialog/DialogBasicCompensation';

import {
  getCompensations,
  createCompensation,
  deleteCompensation,
  updateCompensation,
} from '../../../../redux/actions/compensationsActions';
import useStyles from '../styles';
import {
  COMPENSATIONS_CREATE_RESET,
  COMPENSATIONS_UPDATE_RESET,
} from '../../../../redux/types';

const EmployeeCompensationsTable = ({ match }) => {
  const dispatch = useDispatch();

  const { id } = match.params;

  const [open, setOpen] = useState(false);
  const [selectedCompensation, setSelectedCompensation] = useState({});

  const { compensations } = useSelector((state) => state.compensationsList);
  const { errors: compensationCreateErrors, loading, success } = useSelector(
    (state) => state.compensationCreate,
  );
  const { loading: compensationDeleteLoading } = useSelector(
    (state) => state.compensationDelete,
  );
  const {
    errors: compensationUpdateErrors,
    loading: compensationUpdateLoading,
    success: compensationUpdateSuccess,
  } = useSelector((state) => state.compensationUpdate);

  const { paper, fieldsContainer } = useStyles();

  const errors = { ...compensationCreateErrors, ...compensationUpdateErrors };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: COMPENSATIONS_CREATE_RESET });
    dispatch({ type: COMPENSATIONS_UPDATE_RESET });
    setSelectedCompensation({});
  };

  const handleOnSubmit = (compensationData) => {
    if (selectedCompensation._id) {
      dispatch(updateCompensation(id, selectedCompensation._id, compensationData));
    } else {
      dispatch(createCompensation(id, compensationData));
    }
  };

  useEffect(() => {
    dispatch(getCompensations(id));
  }, []);

  useEffect(() => {
    if (success || compensationUpdateSuccess) {
      handleClose();
    }
  }, [success, compensationUpdateSuccess]);

  return (
    <Paper className={paper} elevation={6}>
      <TitleBox title="Compensation" />
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
          {compensations.map((compensation) => (
            <ListItem key={compensation._id}>
              <ListItemText
                primary="Gross Compensation"
                secondary={(
                  <>
                    <span>{compensation.basicPay}</span>
                    <span>
                      {' '}
                      -
                      {` ${moment(compensation.effectivityDate).format('MMM, DD, YYYY')}`}
                    </span>
                  </>
                )}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setSelectedCompensation(compensation);
                    setOpen(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disabled={compensationDeleteLoading}
                  onClick={() => dispatch(deleteCompensation(id, compensation._id))}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
      <DialogBasicCompensation
        open={open}
        handleClose={handleClose}
        onSubmit={handleOnSubmit}
        errors={errors}
        loading={loading || compensationUpdateLoading}
        compensation={selectedCompensation}
      />
    </Paper>
  );
};

export default withRouter(EmployeeCompensationsTable);
