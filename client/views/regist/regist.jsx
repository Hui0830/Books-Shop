import React,{ Component } from 'react'
import {Form} from 'antd'

import RegistFrom from './registForm';
require("../login.scss");

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistContainer extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	    confirmDirty: false,
	    }

	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
	    this.validateToNextPassword = this.validateToNextPassword.bind(this);
	    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
	}

	// 注册提交事件
	handleSubmit(e){
	  e.preventDefault();
	  this.props.form.validateFieldsAndScroll((err, values) => {
	    if (!err) {
	      console.log('Received values of form: ', values);
	    }
	  });
	}
	/*-------------------------密码输入验证事件---------start-----------------*/
	handleConfirmBlur(e){
	  const value = e.target.value;
	  this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	compareToFirstPassword(rule, value, callback){
	  const form = this.props.form;
	  if (value && value !== form.getFieldValue('password')) {
	    callback('Two passwords that you enter is inconsistent!');
	  } else {
	    callback();
	  }
	}

	validateToNextPassword(rule, value, callback){
	  const form = this.props.form;
	  if (value && this.state.confirmDirty) {
	    form.validateFields(['confirm'], { force: true });
	  }
	  callback();
	}
	/*-------------------------密码输入验证事件------------end--------------*/

	render() {
		const { autoCompleteResult } = this.state;
		return (
			<div className="loginContainer">
      			<h3>欢迎注册旧书街</h3>
      			<RegistFrom 
      				form={this.props.form}
      				handleSubmit={this.handleSubmit}
      				handleConfirmBlur={this.handleConfirmBlur}
      				compareToFirstPassword={this.compareToFirstPassword}
      				validateToNextPassword={this.validateToNextPassword}
      				residences = {residences}
      			/>
      		</div>
		)
	}
}
const WrappedRegistrationForm = Form.create()(RegistContainer);
export default WrappedRegistrationForm;