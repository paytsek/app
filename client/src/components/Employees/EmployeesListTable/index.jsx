import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';

import useStyles from './styles';

const EmployeesListTable = () => {
  const { dataGrid } = useStyles();

  const columns = [
    { field: 'employeeNumber', headerName: 'Employee No.', width: 200 },
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'hireDate', headerName: 'Hire Date', width: 200 },
    { field: 'resignationDate', headerName: 'Resignation Date', width: 200 },
    { field: 'status.active', headerName: 'Status', width: 200 },
    { field: 'department.name', headerName: 'Department', width: 200 },
    { field: 'position', headerName: 'Position', width: 200 },
    { field: 'compensation.basicPay', headerName: 'Gross Pay', width: 200 },
    {
      field: '',
      headerName: '',
      sortable: false,
      width: 290,
      renderCell: () => (
        <>
          <Button color="primary" startIcon={<Search />} />
          <Button color="primary" startIcon={<Edit />} />
          <Button color="primary" startIcon={<Delete />} />
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={dataGrid}
        columns={columns}
        rows={[]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default EmployeesListTable;
