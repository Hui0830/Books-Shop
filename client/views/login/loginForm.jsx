import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

require('./login.scss')

const FormItem = Form.Item;

class Login extends Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this)
	}

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
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
export default LoginForm;