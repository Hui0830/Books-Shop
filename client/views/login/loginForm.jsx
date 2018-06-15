import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';


import { Link } from 'react-router-dom';

import { onLogin } from '../../action/Action.js';


require('./loginForm.scss')

const FormItem = Form.Item;

const Login = ({form,handleSubmit,loading}) => {
    const { getFieldDecorator } = form;
    return (
      <div>
      
      <Form onSubmit={(e) => form.validateFields((err, values) => handleSubmit(e,err, values)) } className="login-form">
        <FormItem 
          label="用户名"
          hasFeedback
          
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入你的账号哦!' }],
          })(
           <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码哦!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
            登入
          </Button>
          还没有账号 <Link to="/regist">立即注册!</Link>
        </FormItem>
      </Form>
      </div>
    );
  }

const LoginForm = Form.create()(Login);
export default LoginForm