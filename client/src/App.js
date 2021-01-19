import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import cx from 'classnames';

import Notifier from './components/Notifier';
import Layout from './components/layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UsersListPage from './pages/UsersListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserEditPage from './pages/UserEditPage';
import CurrentUserProfilePage from './pages/CurrentUserProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import CompanyListPage from './pages/CompanyListPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import CompanyCreatePage from './pages/CompanyCreatePage';
import CompanyUpdatePage from './pages/CompanyUpdatePage';
import CompanySettingsPage from './pages/CompanySettingsPage';
import CompanySettingsCreatePage from './pages/CompanySettingsCreatePage';
import CompanySettingsEditPage from './pages/CompanySettingsEditPage';

import { authUser } from './redux/actions/userActions';
import './stylesheets/main.scss';
import useStyles from './styles';

const token = localStorage.getItem('token');

const App = () => {
	const dispatch = useDispatch();

	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	useEffect(() => {
		dispatch(authUser(token));
	}, [dispatch]);

	return (
		<Router>
			<CssBaseline />
      <Notifier />
			<Switch>
				<Route path="/register" component={RegisterPage} exact />
				<Route path="/login" component={LoginPage} exact />
				<Layout openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}>
					<main
						className={cx(classes.content, {
							[classes.contentShift]: openDrawer,
						})}
					>
						<div style={{ minHeight: 80 }} />
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
								path="/company-settings"
								component={CompanySettingsPage}
								exact
							/>
							<Route
								path="/company-settings/:companyId"
								component={CompanySettingsCreatePage}
								exact
							/>
							<Route
								path="/company-settings/:companyId/edit"
								component={CompanySettingsEditPage}
								exact
							/>
							<Route
								path="/companies/create"
								component={CompanyCreatePage}
								exact
							/>
							<Route
								path="/companies/:id"
								component={CompanyDetailsPage}
								exact
							/>
							<Route
								path="/companies/:id/edit"
								component={CompanyUpdatePage}
								exact
							/>
						</Switch>
					</main>
				</Layout>
			</Switch>
		</Router>
	);
};

export default App;
