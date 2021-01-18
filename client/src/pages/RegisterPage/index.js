import { useState } from 'react';
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

import useStyles from './styles';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const classes = useStyles();

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
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
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
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
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
