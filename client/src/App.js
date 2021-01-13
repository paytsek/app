import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import cx from 'classnames';

import Layout from './components/layout';
import RegisterPage from './pages/RegisterPage';
import UsersListPage from './pages/UsersListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserEditPage from './pages/UserEditPage';
import CurrentUserProfile from './pages/CurrentUserProfile';

import './stylesheets/main.scss';
import useStyles from './styles';

const App = () => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<Router>
			<CssBaseline />
			<Route path="/register" component={RegisterPage} exact />
			<Switch>
				<Layout openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
					<main
						className={cx(classes.content, {
							[classes.contentShift]: openDrawer,
						})}
					>
						<div style={{ minHeight: 64 }} />
						<Route path="/users" component={UsersListPage} exact />
						<Route path="/users/:id/edit" component={UserEditPage} exact />
						<Route path="/users/:id" component={UserDetailsPage} exact />
						<Route path="/profile" component={CurrentUserProfile} exact />
					</main>
				</Layout>
			</Switch>
		</Router>
	);
};

export default App;
