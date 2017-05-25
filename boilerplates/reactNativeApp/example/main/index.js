import React, { Component } from 'react';
import { createRouter, NavigationProvider, StackNavigation} from '@expo/ex-navigation';
import {COLORS} from './utils/constants';

/** VIEWS **/
import CollapsibleRoute from './components/CollapsibleRoute';
import Init from './views/Init';
import Index from './views/Index';
import Login from './views/Login';
import SignUp from './views/SignUp';

export const Router = createRouter(() => ({
	collapsibleRoute: () => CollapsibleRoute,
	init: () => Init,
	index: () => Index,
	login: () => Login,
	signUp: () => SignUp
}), {ignoreSerializableWarnings: true});

export default class example extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			<NavigationProvider router={Router}>
				<StackNavigation
					id="master"
					navigatorUID="master"
					defaultRouteConfig={{
						styles: {
							backgroundColor: COLORS.WHITE
						}
					}}
					initialRoute={ Router.getRoute('init') } />
			</NavigationProvider>
		);
	}
}