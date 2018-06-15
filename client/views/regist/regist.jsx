import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import {Form,message} from 'antd'

import RegistFrom from './registForm';
import {post} from '../../until/http.js';
require("../login.scss");

const residences = [
{
  value: '江西',
  label: '江西',
  children: [
	  {
	    value: '江西农业大学',
	    label: '江西农业大学',
	  },
	  {
	    value: '江西财经大学',
	    label: '江西财经大学',
	  },
	  {
	    value: '江西南昌大学',
	    label: '江西南昌大学',
	  }
  ],
}, 
{
  value: '北京',
  label: '北京',
  children: [
	  {
	    value: '北京大学',
	    label: '北京大学',
	  },
	  {
	    value: '清华大学',
	    label: '清华大学',
	  },
	  {
	    value: '北京工业大学',
	    label: '北京工业大学',
	  }
  ],
}
];

class RegistContainer extends Component {
	static contextTypes = {
	  router: PropTypes.object
	}
	constructor(props) {
	  super(props);

	  this.state = {
	    confirmDirty: false,
	    messageShow: false,
	    loading:false
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
	    	const [city,school] = values.school;
	    	delete values.school;
	    	this.setState({
	    		loading:true
	    	})
	    	console.log(JSON.stringify({city,school,...values}));

	    	post('/mall/user/user/register',JSON.parse(JSON.stringify({city,school,...values})))
	    	.then((res) => {
	    		this.setState({
	    			loading:false
	    		})
	    		this.context.router.history.replace('/login')
	    	})
	    	.catch((err) => {
	    		this.setState({
	    			loading:false
	    		})
	    		message.error(`${err.msg}`)
	    		console.log(city,school,err)
	    	})
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
		const { autoCompleteResult,loading} = this.state;
		return (
			<div className="login_bg bg_img">

			<div className="loginContainer">
      			<h3>欢迎注册旧书街</h3>
      			<RegistFrom 
      				loading={loading}
      				form={this.props.form}
      				handleSubmit={this.handleSubmit}
      				handleConfirmBlur={this.handleConfirmBlur}
      				compareToFirstPassword={this.compareToFirstPassword}
      				validateToNextPassword={this.validateToNextPassword}
      				residences = {residences}
      			/>
      		</div>
      		</div>
		)
	}
}
const WrappedRegistrationForm = Form.create()(RegistContainer);
export default WrappedRegistrationForm;