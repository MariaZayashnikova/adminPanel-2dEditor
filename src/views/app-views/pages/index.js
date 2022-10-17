import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const Pages = ({ match }) => (
	<Suspense fallback={<Loading cover="content" />}>
		<Switch>
			<Route path={`${match.url}/user-list`} component={lazy(() => import(`./user-list`))} />
			<Route path={`${match.url}/editor`} component={lazy(() => import(`./editor`))} />
			<Redirect exact from={`${match.url}`} to={`${match.url}/user-list`} />
		</Switch>
	</Suspense>
);

export default Pages;
