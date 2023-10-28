import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import DashboardHome from 'home/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardT from 'teacher/layouts/admin';
import DashboardS from 'student/layouts/admin';
// import Profile from "./views/admin/profile/index";

ReactDOM.render(
	<ChakraProvider theme={theme}>
		<React.StrictMode>
			<ThemeEditorProvider>
				<HashRouter>
					<Switch>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/Home`} component={DashboardHome} />
						<Route path={`/Teacher`} component={DashboardT} />
						<Route path={`/Student`} component={DashboardS} />
						{/* <Route path="/profile#/admin/profile" component={Profile} /> */}
						<Redirect from='/' to='/Home' />
					</Switch>
				</HashRouter>
			</ThemeEditorProvider>
		</React.StrictMode>
	</ChakraProvider>,
	document.getElementById('root')
);
