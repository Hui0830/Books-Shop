import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from '../client/views/layout/app-navBar';
import Footer from '../client/views/layout/Footer';
import Index from '../client/views//product.jsx';
import AppLayout from '../client/views/layout/Layout';
	
const root = document.getElementById("root");
ReactDOM.render(
	<AppLayout>
		<Index key='Index' />,
	</AppLayout>,
	root
)
