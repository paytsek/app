import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';

import { getUsersList } from '../../../redux/actions/usersActions';
import useStyles from './styles';

const UsersListTable = ({ history }) => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector(state => state.usersList);
  const { user } = useSelector(state => state.authUser);

  const { dataGrid } = useStyles();

  const columns = [
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'username', headerName: 'User name', width: 200 },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
    },
    {
      field: '',
      headerName: 'Action',
      sortable: false,
      width: user.role === 'admin' ? 190 : 100,
      renderCell: props => (
        <Fragment>
          <Button color="primary" startIcon={<Search onClick={() => history.push(`users/${props.row.id}`)} />} />
          {user.role === 'admin' && (
            <Button color="primary" startIcon={<Edit />} onClick={() => history.push(`users/${props.row.id}/edit`)} />
          )}
          {user.role === 'admin' && <Button color="primary" startIcon={<Delete />} />}
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  return (
    <DataGrid
      className={dataGrid}
      rows={users.map(userList => ({ ...userList, id: userList._id }))}
      columns={columns}
      pageSize={5}
      checkboxSelection
      disableSelectionOnClick
      autoHeight
      loading={loading}
    />
  );
};

export default withRouter(UsersListTable);
