import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import cx from 'classnames';

import Layout from './components/layout';
import RegisterPage from './pages/RegisterPage';
import UsersListPage from './pages/UsersListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserEditPage from './pages/UserEditPage';
import CurrentUserProfilePage from './pages/CurrentUserProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import CompanyListPage from './pages/CompanyListPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import CompanyCreatePage from './pages/CompanyCreatePage';

import './stylesheets/main.scss';
import useStyles from './styles';

const App = () => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<Router>
			<CssBaseline />
			<Route path="/register" component={RegisterPage} exact />
			<Layout openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
				<main
					className={cx(classes.content, {
						[classes.contentShift]: openDrawer,
					})}
				>
					<div style={{ minHeight: 64 }} />
					<Switch>
						<Route path="/users" component={UsersListPage} exact />
						<Route path="/users/:id/edit" component={UserEditPage} exact />
						<Route path="/users/:id" component={UserDetailsPage} exact />
						<Route path="/profile" component={CurrentUserProfilePage} exact />
						<Route
							path="/change-password"
							component={ChangePasswordPage}
							exact
						/>
						<Route path="/companies" component={CompanyListPage} exact />
						<Route
							path="/companies/create"
							component={CompanyCreatePage}
							exact
						/>
						<Route path="/companies/:id" component={CompanyDetailsPage} exact />
					</Switch>
				</main>
			</Layout>
		</Router>
	);
};

export default App;
