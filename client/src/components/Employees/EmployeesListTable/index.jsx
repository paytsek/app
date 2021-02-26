import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';
import moment from 'moment';

import DialogAlert from '../../Dialog/DialogAlert';

import {
  getEmployeesList,
  deleteEmployee,
} from '../../../redux/actions/employeesActions';
import useStyles from './styles';

const EmployeesListTable = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const dispatch = useDispatch();

  const { employees, loading } = useSelector((state) => state.employeesList);
  const { loading: employeeDeleteLoading } = useSelector((state) => state.employeeDelete);

  const { dataGrid } = useStyles();

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployee({});
  };

  const handleOpen = (employee) => {
    setOpen(true);
    setSelectedEmployee(employee);
  };

  const handleOnConfirm = async () => {
    await dispatch(deleteEmployee(selectedEmployee._id));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getEmployeesList());
  }, []);

  const columns = [
    { field: 'employeeNumber', headerName: 'Employee No.', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'hireDate', headerName: 'Hire Date', width: 200 },
    { field: 'resignationDate', headerName: 'Resignation Date', width: 200 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'position', headerName: 'Position', width: 200 },
    { field: 'compensation', headerName: 'Gross Pay', width: 200 },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 290,
      renderCell: ({ row }) => (
        <>
          <Button
            color="primary"
            onClick={() => history.push(`employees/${row._id}`)}
            startIcon={<Search />}
          />
          <Button
            color="primary"
            onClick={() => history.push(`employees/${row._id}/edit`)}
            startIcon={<Edit />}
          />
          <Button
            color="primary"
            onClick={() => handleOpen(row)}
            startIcon={<Delete />}
          />
        </>
      ),
    },
  ];
  const rows = employees.map((employee) => ({
    ...employee,
    hireDate: moment(employee.hireDate).format('MMM DD, YYYY'),
    resignationDate:
      employee.resignationDate && moment(employee.resignationDate).format('MMM DD, YYYY'),
    department: employee.department.name,
    compensation: employee.compensation.basicPay,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={dataGrid}
        columns={columns}
        rows={rows}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        loading={loading}
      />
      <DialogAlert
        title={`Are you sure you want to remove ${selectedEmployee.fullName || ''}?`}
        open={open}
        handleClose={handleClose}
        onConfirm={handleOnConfirm}
        loading={employeeDeleteLoading}
      />
    </div>
  );
};

export default withRouter(EmployeesListTable);
