import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Breadcrumbs,
  Paper,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import moment from 'moment';

import MuiSkeleton from '../../components/MuiSkeleton';

import { getEmployeeDetails } from '../../redux/actions/employeesActions';
import useStyles from './styles';
import { EMPLOYEE_DETAILS_RESET } from '../../redux/types/employeeTypes';

const EmployeeDetailsPage = ({ match }) => {
  const { id, slug } = match.params;
  const dispatch = useDispatch();

  const { employee, loading } = useSelector((state) => state.employeeDetails);

  const { active, paper, title, actions, details } = useStyles();

  useEffect(() => {
    dispatch(getEmployeeDetails(id));

    return () => {
      dispatch({ type: EMPLOYEE_DETAILS_RESET });
    };
  }, []);

  return (
    <Container>
      <Breadcrumbs>
        <Link to={`/${slug}/dashboard`}>Dashboard</Link>
        <Link to={`/${slug}/employees`} aria-current="page">
          Employees
        </Link>
        <Link className={active} to={`${id}`} aria-current="page">
          View Employee
        </Link>
      </Breadcrumbs>
      <Paper className={paper}>
        <Typography variant="h5" className={title} gutterBottom>
          View Employee
        </Typography>
        <div className={actions}>
          <Button variant="contained" color="primary" startIcon={<Edit />} size="small">
            Edit
          </Button>
        </div>
        {loading ? (
          <MuiSkeleton />
        ) : (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Employee Information
                </Typography>
                <div className={details}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="subtitle1">{employee.email || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Typography variant="subtitle1">
                    {employee.status.active
                      ? `Active since ${moment(employee.status.effectivityDate).format(
                        'MMM DD, YYYY',
                      )}`
                      : `Inactive since${moment(employee.status.effectivityDate).format(
                        'MMM DD, YYYY',
                      )}`}
                  </Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Employee Number</Typography>
                  <Typography variant="subtitle1">{employee.employeeNumber || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">First Name</Typography>
                  <Typography variant="subtitle1">{employee.firstName}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Last Name</Typography>
                  <Typography variant="subtitle1">{employee.lastName}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Department</Typography>
                  <Typography variant="subtitle1">{employee.department.name || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Position</Typography>
                  <Typography variant="subtitle1">{employee.position || ''}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Hire Date</Typography>
                  <Typography variant="subtitle1">
                    {(employee.hireDate && moment(employee.hireDate).format('MMM DD, YYYY')) ||
                      '--'}
                  </Typography>
                </div>
                {employee.resignationDate && (
                  <div className={details}>
                    <Typography variant="subtitle2">Resignation Date</Typography>
                    <Typography variant="subtitle1">
                      {(employee.hireDate &&
                        moment(employee.resignationDate).format('MMM DD, YYYY')) ||
                        '--'}
                    </Typography>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Personal Information
                </Typography>
                <div className={details}>
                  <Typography variant="subtitle2">Gender</Typography>
                  <Typography variant="subtitle1">{employee.gender || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Civil Status</Typography>
                  <Typography variant="subtitle1">{employee.civilStatus || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Qualified Dependents</Typography>
                  <Typography variant="subtitle1">
                    {employee.numberOfQualifiedDependents}
                  </Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Birth Date</Typography>
                  <Typography variant="subtitle1">
                    {(employee.birthDate && moment(employee.birthDate).format('MMM DD, YYYY')) ||
                      '--'}
                  </Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Nationality</Typography>
                  <Typography variant="subtitle1">{employee.nationality || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Registered Address</Typography>
                  <Typography variant="subtitle1">{employee.formattedRegisteredAddress}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Permanent Address</Typography>
                  <Typography variant="subtitle1">{employee.formattedPermanentAddress}</Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Government IDs
                </Typography>
                <div className={details}>
                  <Typography variant="subtitle2">SSS</Typography>
                  <Typography variant="subtitle1">{employee.sssNumber || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Philhealth</Typography>
                  <Typography variant="subtitle1">{employee.phicNumber || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Pag-Ibig</Typography>
                  <Typography variant="subtitle1">{employee.hdmfNumber || '--'}</Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Tax Identification</Typography>
                  <Typography variant="subtitle1">{employee.tin || '--'}</Typography>
                </div>
              </Grid>
              <Grid item sx={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  Address
                </Typography>
                <div className={details}>
                  <Typography variant="subtitle2">Registered Address</Typography>
                  <Typography variant="subtitle1">
                    {employee.formattedRegisteredAddress || '--'}
                  </Typography>
                </div>
                <div className={details}>
                  <Typography variant="subtitle2">Permanent Address</Typography>
                  <Typography variant="subtitle1">
                    {employee.formattedPermanentAddress || '--'}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <div className={details}>
                  <List>
                    <Typography variant="h5">Compensation</Typography>
                    {employee.compensations.map((compensation) => (
                      <ListItem key={compensation._id}>
                        <ListItemText
                          primary="Gross Compensation"
                          secondary={(
                            <>
                              <Typography component="span" variant="body2" color="textPrimary">
                                {compensation.basicPay}
                              </Typography>
                              {` - ${moment(compensation.effectivityDate).format('MMM DD, YYYY')}`}
                            </>
                          )}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={details}>
                  <List>
                    <Typography variant="h5">Statuses</Typography>
                    {employee.statuses.map((status) => (
                      <ListItem key={status._id}>
                        <ListItemText
                          primary="Status"
                          secondary={(
                            <>
                              <Typography component="span" variant="body2" color="textPrimary">
                                {status.active ? 'Active' : 'Inactive'}
                              </Typography>
                              {` - ${moment(status.effectivityDate).format('MMM DD, YYYY')}`}
                            </>
                          )}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default EmployeeDetailsPage;
