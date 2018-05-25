import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppLayout from '../client/views/layout/layout';
import Router from '../client/config/router';
import store from '../client/store/Store';
	
const root = document.getElementById("root");
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store} >
			<AppLayout>
				<Router key='Index' />,
			</AppLayout>
		</Provider>
	</BrowserRouter>,
	root
)
