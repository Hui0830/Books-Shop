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
			console.log(values);
	    if (!err) {
	    	this.setState({
	    		loading:true
	    	})
		    loginPost('/api/login',JSON.parse(JSON.stringify({...values})))
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