import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Drawer } from '@material-ui/core';
import {
  AccountCircle,
  Menu as MenuIcon,
  PersonOutline as PersonOulineIcon,
  Https as HttpsIcon,
  Business as BusinessIcon,
} from '@material-ui/icons';

import HeaderAdminList from './HeaderAdminList';
import HeaderMemberList from './HeaderMemberList';

import { LOGOUT, COMPANY_TENANT_REMOVE } from '../../../redux/types';
import useStyles from './style';

const Header = ({ openDrawer, setOpenDrawer, history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authUser);
  const { slug } = useSelector((state) => state.companyTenant);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url = '') => {
    setAnchorEl(null);
    return url && history.push(url);
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    dispatch({ type: COMPANY_TENANT_REMOVE });
    history.push('/login');
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer((prevState) => !prevState)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src="/images/logo.png" alt="logo" />
            PayTsek
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              style={{ fontSize: 'inherit' }}
            >
              <AccountCircle />
              {user.firstName}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => handleClose()}
            >
              <MenuItem onClick={() => handleClose(`/${slug}/profile`)}>
                <PersonOulineIcon />
                Profile
              </MenuItem>
              <MenuItem onClick={() => handleClose(`/${slug}/change-password`)}>
                <HttpsIcon />
                Change Password
              </MenuItem>
              <MenuItem onClick={() => handleClose(`/${slug}/companies`)}>
                <BusinessIcon />
                Companies
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawer,
        }}
      >
        <div className={classes.drawerHeader} />
        {user.role === 'admin' && <HeaderAdminList />}
        {user.role === 'member' && <HeaderMemberList />}
      </Drawer>
    </>
  );
};

export default withRouter(Header);
