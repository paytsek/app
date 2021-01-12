import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/layout';
import Register from './pages/Register';

import './stylesheets/main.scss';

const App = () => {
	return (
		<Router>
			<CssBaseline />
			<Route path="/register" component={Register} exact />
			<Switch>
        <Layout>
          <main>
            <div>DASHBOARD</div>
          </main>
        </Layout>
      </Switch>
		</Router>
	);
};

export default App;
