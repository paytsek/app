import { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';
import {
	AccountCircle,
	Menu as MenuIcon,
	People as PeopleIcon,
	PersonOutline as PersonOulineIcon,
	Https as HttpsIcon,
  Business as BusinessIcon,
  BusinessCenter as BusinessCenterIcon
} from '@material-ui/icons';

import useStyles from './style';

const Header = ({ openDrawer, setOpenDrawer, history }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (url = '') => {
		setAnchorEl(null);
		url && history.push(url);
	};

	return (
		<Fragment>
			<AppBar position="static" className={classes.appBar}>
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
						PayTsek
					</Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
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
							onClose={handleClose}
						>
							<MenuItem onClick={() => handleClose('/profile')}>
								<PersonOulineIcon />
								Profile
							</MenuItem>
							<MenuItem onClick={() => handleClose('/change-password')}>
								<HttpsIcon />
								Change Password
							</MenuItem>
							<MenuItem onClick={handleClose}>Log out</MenuItem>
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
				<List>
					<Link to="/users">
						<ListItem button>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="Users" />
						</ListItem>
					</Link>
					<Link to="/change-password">
						<ListItem button>
							<ListItemIcon>
								<HttpsIcon />
							</ListItemIcon>
							<ListItemText primary="Change Password" />
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
			</Drawer>
		</Fragment>
	);
};

export default withRouter(Header);
