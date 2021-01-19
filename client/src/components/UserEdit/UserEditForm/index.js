import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, TextField, Button } from '@material-ui/core';
import { Save, Undo, Clear, Delete } from '@material-ui/icons';

import MuiSkeleton from '../../MuiSkeleton';

import {
	getUserDetails,
	updateUserDetails,
} from '../../../redux/actions/usersActions';
import { USER_UPDATE_DETAILS_RESET } from '../../../redux/actions/types';
import useStyles from './styles';

const UserEditForm = ({ history, match }) => {
	const [email, setEmail] = useState('');

	const id = match.params.id;

	const dispatch = useDispatch();

	const { user, loading } = useSelector((state) => state.userDetails);
	const { errors, loading: updateUserDetailsLoading } = useSelector(
		(state) => state.updateUserDetails
	);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserDetails(match.params.id, { email }));
	};

	const handlerReset = () => {
		setEmail(user.email);
	};

	const { formButton } = useStyles();

	useEffect(() => {
		if (user.email) {
			setEmail(user.email);
		}
		dispatch(getUserDetails(id));
		return () => {
			dispatch({ type: USER_UPDATE_DETAILS_RESET });
		};
	}, [dispatch, id, user.email]);

	return loading ? (
		<MuiSkeleton />
	) : (
		<form onSubmit={onSubmit}>
			<Grid container>
				<Grid item xs={12} md={7} lg={8}>
					<TextField
						placeholder="Email"
						label="Email"
						fullWidth
						margin="normal"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!!errors.email}
						helperText={errors.email}
					/>
				</Grid>
			</Grid>
			<div className={formButton}>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					size="small"
					startIcon={<Save />}
					disabled={updateUserDetailsLoading}
				>
					Save
				</Button>
				<Button size="small" onClick={handlerReset} startIcon={<Undo />}>
					Reset
				</Button>
				<Button
					size="small"
					startIcon={<Clear />}
					onClick={() => history.push('/users')}
				>
					Cancel
				</Button>
				<Button
					size="small"
					variant="contained"
					color="secondary"
					startIcon={<Delete />}
				>
					Delete
				</Button>
			</div>
		</form>
	);
};

export default withRouter(UserEditForm);
