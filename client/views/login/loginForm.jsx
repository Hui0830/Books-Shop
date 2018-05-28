import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


import { Link } from 'react-router-dom';

import { onLogin } from '../../action/Action.js';

require('./login.scss')

const FormItem = Form.Item;

const mapStateToProps = (state,ownProp) => {
  console.log(state,ownProp);
  console.log(...state.loginReducer)
  const { status } = state.loginReducer;
  return {
    status,
    ...ownProp
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (datas) => {
        dispatch(onLogin(datas))  
      }
  }
}

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this)
	}

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
        if (this.props.status === 'success') {
          console.log(this.props.status);
          this.context.router.history.push('/index')
        }
        console.log(this.props.status);
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem 
          label="userName"
          hasFeedback
          
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
           <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem label="password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/regist">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(Login);
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)