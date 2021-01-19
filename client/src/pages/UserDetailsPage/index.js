import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Paper,
	Container,
	Breadcrumbs,
	Typography,
	Button,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import MuiSkeleton from '../../components/MuiSkeleton';

import { getUserDetails } from '../../redux/actions/usersActions';
import useStyles from './styles';

const UserDetailsPage = ({ history, match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();

	const { user, loading } = useSelector((state) => state.userDetails);
	const { user: loggedInUser } = useSelector((state) => state.authUser);

	const { active, paper, title, actions, details } = useStyles();

	useEffect(() => {
		dispatch(getUserDetails(id));
	}, [dispatch, id]);

	return (
		<Container>
			<Breadcrumbs>
				<Link to="/">Dashboard</Link>
				<Link to="/users" aria-current="page">
					Users
				</Link>
				<Link className={active} to="/users/1" aria-current="page">
					View User
				</Link>
			</Breadcrumbs>
			<Paper className={paper}>
				<Typography variant="h5" className={title} gutterBottom>
					View User
				</Typography>
				{loading ? (
					<MuiSkeleton />
				) : (
					<Fragment>
						{loggedInUser.role === 'admin' && (
							<div className={actions}>
								<Button
									variant="contained"
									color="primary"
									startIcon={<Edit />}
									size="small"
									onClick={() => history.push(`${user._id}/edit`)}
								>
									Edit
								</Button>
							</div>
						)}
						<div className={details}>
							<Typography variant="subtitle2">Email</Typography>
							<Typography variant="subtitle1">{user.email}</Typography>
						</div>
						<div className={details}>
							<Typography variant="subtitle2">Username</Typography>
							<Typography variant="subtitle1">{user.username}</Typography>
						</div>
						<div className={details}>
							<Typography variant="subtitle2">Role</Typography>
							<Typography variant="subtitle1">{user.role}</Typography>
						</div>
						<div className={details}>
							<Typography variant="subtitle2">First Name</Typography>
							<Typography variant="subtitle1">{user.firstName}</Typography>
						</div>
						<div className={details}>
							<Typography variant="subtitle2">Last Name</Typography>
							<Typography variant="subtitle1">{user.lastName}</Typography>
						</div>
					</Fragment>
				)}
			</Paper>
		</Container>
	);
};

export default UserDetailsPage;
