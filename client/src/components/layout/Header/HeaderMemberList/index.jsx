import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import {
  BusinessCenter as BusinessCenterIcon,
  Dashboard as DashboardIcon,
  ExpandMore,
  ExpandLess,
  Settings,
  GroupWork,
  People,
  AttachMoney,
} from '@material-ui/icons';

import useStyles from '../style';

const HeaderAdminList = () => {
  const [open, setOpen] = useState(false);

  const { slug } = useSelector((state) => state.companyTenant);

  const handleOpen = () => setOpen((prevState) => !prevState);

  const { nested } = useStyles();

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
      <ListItem button onClick={handleOpen}>
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Company Settings" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={`/${slug}/company-settings`}>
            <ListItem button className={nested}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
          <Link to={`/${slug}/departments`}>
            <ListItem button className={nested}>
              <ListItemIcon>
                <GroupWork />
              </ListItemIcon>
              <ListItemText primary="Departments" />
            </ListItem>
          </Link>
          <Link to={`/${slug}/taxablePays`}>
            <ListItem button className={nested}>
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText primary="Taxable Pays" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <Link to={`/${slug}/employees`}>
        <ListItem button>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
      </Link>
    </List>
  );
};

export default HeaderAdminList;
