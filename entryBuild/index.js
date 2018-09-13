import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter , HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory'

import AppLayout from '../client/views/layout/layout';
import Route from '../client/config/router';
import store from '../client/store/Store';
const history = createBrowserHistory();
let Router = process.env.NODE_ENV !== 'production' ? BrowserRouter : HashRouter;
const root = document.getElementById("root");
ReactDOM.render(
	<Router history={history} >
		<Provider store={store} >
			<AppLayout>
				<Route key='Index' />
			</AppLayout>
		</Provider>
	</Router  >,
	root
)
