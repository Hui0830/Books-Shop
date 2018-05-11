import React from 'react';
import ReactDOM from 'react-dom';

import Index from '../client/views//index.jsx';
import AppLayout from '../client/views/layout/Layout';
	
const root = document.getElementById("root");
ReactDOM.render(
	<AppLayout>
		<Index key='Index' />,
	</AppLayout>,
	root
)
