import { Layout,message } from 'antd';
import React, { Component } from 'react';
import {loginPost} from '../until/http.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LoginForm from './login/loginForm';
require('./login.scss')



export default class Login extends Component {
	static contextTypes = {
	  router: PropTypes.object
	}
	constructor(){
		super(...arguments)
		this.state = {
			loading: false
		}
	    this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(e, err, values) {
	  e.preventDefault();
	  
	    if (!err) {
	    	this.setState({
	    		loading:true
	    	})
		    loginPost('/api/user/login',JSON.parse(JSON.stringify({...values})))
		    .then(res => {
		    	this.setState({
		    		loading:false
		    	})
		        this.context.router.history.push('/index')
		    })
		    .catch(err => {
		    	this.setState({
		    		loading:false
		    	})
		        message.error(`${err}`)
		    })
	    	console.log('Received values of form: ', values);
	    }
	  }
	render() {
		const { Header , Content ,Sider } = Layout;
		return (
			<div className="login_bg bg_img">
			<div className="loginContainer ">
				<h3>登录校园旧书街</h3>
				<LoginForm loading={this.state.loading} handleSubmit={this.handleSubmit} />
			</div>
			</div>
		)
		
	}
}