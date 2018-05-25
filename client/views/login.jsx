import { Layout } from 'antd';
import React, { Component } from 'react';

import LoginForm from './login/loginForm';
require('./login.scss')

export default class Login extends Component {

	render() {
		const { Header , Content ,Sider } = Layout;
		return (
			<div className="loginContainer">
					<h3>登录校园旧书街</h3>
					<LoginForm />
			</div>
		)
		
	}
}