import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Search, Edit, Delete } from '@material-ui/icons';

import DialogPasswordConfirmation from '../../Dialog/DialogPasswordConfirmation';

import { getUsersList, deleteUser } from '../../../redux/actions/usersActions';
import useStyles from './styles';

const UsersListTable = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const { users, loading } = useSelector(state => state.usersList);
  const { user } = useSelector(state => state.authUser);
  const { loading: userListDeleteLoading, success } = useSelector(state => state.userListDelete);

  const handleClose = () => {
    setOpen(false);
    setUserId('');
  };

  const handleOpen = id => {
    setOpen(true);
    setUserId(id);
  };

  const handleOnContinue = userData => {
    dispatch(deleteUser(userId, userData));
  };

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
          {user.role === 'admin' && (
            <Button color="primary" onClick={() => handleOpen(props.row.id)} startIcon={<Delete />} />
          )}
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  return (
    <Fragment>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          className={dataGrid}
          rows={users.map(userList => ({ ...userList, id: userList._id }))}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          loading={userListDeleteLoading || loading}
          autoHeight
        />
      </div>
      <DialogPasswordConfirmation
        open={open}
        handleClose={handleClose}
        title="Are you sure you want to delete this user?"
        onContinue={handleOnContinue}
        loading={userListDeleteLoading}
      />
    </Fragment>
  );
};

export default withRouter(UsersListTable);
