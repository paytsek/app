import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Business as BusinessIcon,
  BusinessCenter as BusinessCenterIcon,
  Dashboard as DashboardIcon,
} from '@material-ui/icons';

const HeaderAdminList = () => (
  <List>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/companies">
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

export default HeaderAdminList;
