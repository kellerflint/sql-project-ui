import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('pages/Home'));
const Playground = React.lazy(() => import('pages/Playground'));

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/test" component={Playground} />
			</Switch>
		</Router>
	);
};

export default Routes;
