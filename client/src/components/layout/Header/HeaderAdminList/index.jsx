import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  BusinessCenter as BusinessCenterIcon,
  Dashboard as DashboardIcon,
} from '@material-ui/icons';

const HeaderAdminList = () => {
  const { slug } = useSelector(state => state.companySlug);

  return (
    <List>
      <Link to={`/${slug}/dashboard`}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <Link to={`/${slug}/users`}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
      <Link to={`/${slug}/companies`}>
        <ListItem button>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItem>
      </Link>
      <Link to="/company-settings">
        <ListItem button>
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Company Settings" />
        </ListItem>
      </Link>
    </List>
  );
};

export default HeaderAdminList;
