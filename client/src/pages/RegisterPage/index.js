import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Paper,
	Grid,
	Typography,
} from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons/';

import PageLoader from '../../components/PageLoader';

import useStyles from './styles';
import { registerUser } from '../../redux/actions/usersActions';
import { REGISTER_RESET } from '../../redux/actions/types';

const RegisterPage = ({ history }) => {
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');

	const {
		errors: registerUserErrors,
		loading: registerUsersLoading,
	} = useSelector((state) => state.registerUser);
	const { loading: authUserLoading, auth } = useSelector(
		(state) => state.authUser
	);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(registerUser({ email, username, firstName, lastName, password }));
	};

	const classes = useStyles();

	useEffect(() => {
		if (auth) {
			history.push('/');
		}

		return () => {
			dispatch({ type: REGISTER_RESET });
		};
	}, [history, auth, dispatch]);

	if (authUserLoading) {
		return <PageLoader />;
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign Up
					</Typography>
					<form className={classes.form} noValidate onSubmit={onSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="off"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={!!registerUserErrors.email}
							helperText={registerUserErrors.email}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="User Name"
							name="username"
							autoComplete="off"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							error={!!registerUserErrors.username}
							helperText={registerUserErrors.username}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="firstname"
							label="First Name"
							name="firstName"
							autoComplete="off"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							error={!!registerUserErrors.firstName}
							helperText={registerUserErrors.firstName}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="lastname"
							label="Last Name"
							name="lastName"
							autoComplete="off"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							error={!!registerUserErrors.lastName}
							helperText={registerUserErrors.lastName}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							error={!!registerUserErrors.password}
							helperText={registerUserErrors.password}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={registerUsersLoading}
						>
							Sign Up
						</Button>
						<Grid container>
							<Grid item>
								<Link to="/login">
									<Typography paragraph color="primary">
										Already have an account? Sign In
									</Typography>
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

export default RegisterPage;
