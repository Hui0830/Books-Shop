import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,Upload,Modal } from 'antd';
import { connect } from 'react-redux';

import UploadAvatar from '../../components/uploaderAvatar/uploader';

// const userInfo = store.getState().user.userInfo;
const FormItem = Form.Item;
const Option = Select.Option;

const mapStateToProps = (state,ownProps) => {
	const { loginReducer } = state;
	return {
		...loginReducer
	}
}

class ChangeFrom extends Component {
	constructor() {
		super(...arguments)
		this.state = {
		  userInfo:this.props.userInfo,
		  confirmDirty: false,
		  previewVisible: false,
	      previewImage: '',
	      fileList: [{
	        uid: -1,
	        name: 'xxx.png',
	        status: 'done',
	        url: this.props.userInfo.avatar,
	      }],
		 }
		this.handleSubmit = this.handleSubmit.bind(this);
		this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
		this.handleConfirmBlur = this.handleConfirmBlur.bind(this);

		/*this.handleCancel = this.handleCancel.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePreview = this.handlePreview.bind(this);*/
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
	/*handleCancel(){
		this.setState({ previewVisible: false })
	}

	handlePreview(file){
	    this.setState({
	      previewImage: file.url || file.thumbUrl,
	      previewVisible: true,
	    });
	  }

	 handleChange({ fileList }){
	  	this.setState({ fileList })
	  }*/

	render() {
		const {getFieldDecorator} = this.props.form;
		const { userInfo } = this.state;
		const prefixSelector = getFieldDecorator('prefix', {
		  initialValue: '86',
		})(
		  <Select style={{ width: 70 }}>
		    <Option value="86">+86</Option>
		    <Option value="87">+87</Option>
		  </Select>
		);
		const { previewVisible, previewImage, fileList } = this.state;
		   const uploadButton = (
		     <div>
		       <Icon type="plus" />
		       <div className="ant-upload-text">Upload</div>
		     </div>
		   );
		return (
			<div className="change_container">
				<h3 className="border_bottom taxt_blue_color">基本信息修改</h3>
				<div className="change_avatar">
					头像：<UploadAvatar uploadUrl="//jsonplaceholder.typicode.com/posts/" avatar={userInfo.avatar} />
				</div>
				<Form onSubmit={this.handleSubmit} style={{margin: "10px auto",padding: "0 100px"}}>
				 {/*<Upload
				           action="//jsonplaceholder.typicode.com/posts/"
				           listType="picture-card"
				           fileList={fileList}
				           onPreview={this.handlePreview}
				           onChange={this.handleChange}
				         >
				           {fileList.length >= 1 ? null : uploadButton}
				 </Upload>
		         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		           <img alt="example" style={{ width: '100%' }} src={previewImage} />
		         </Modal>*/}

				 <FormItem
				    label="旧密码"
				    hasFeedback
				  >
				    {
				    	getFieldDecorator('password', {
				      		rules: [
					      		{
					        		required: true, message: '密码不能为空!',
					      		}				      		],
				    	})(<Input type="password" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
				    }
				 </FormItem>
				{/*---------------密码--------------------*/}
				  <FormItem
				    label="密码"
				    hasFeedback
				  >
				    {
				    	getFieldDecorator('password', {
				      		rules: [
					      		{
					        		required: true, message: '密码不能为空!',
					      		}, 
					      		{
					        		validator: this.validateToNextPassword,
					      		}
				      		],
				    	})(<Input type="password" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
				    }
				  </FormItem>
				{/*---------------确认密码--------------------*/}
				  <FormItem
				    label="确认密码"
				    hasFeedback
				  >
				    {
				    	getFieldDecorator('confirm', {
					      rules: [
						      {
						        required: true, message: '请再次输入密码!',
						      }, 
						      {
						        validator: this.compareToFirstPassword,
						      }
					      ],
				    	})(<Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
				    }
				  </FormItem>
				{/*---------------昵称--------------------*/}
				  <FormItem
				  	hasFeedback
				    label={(
				      <span>
				        昵称
				        <Tooltip title="What do you want others to call you?">
				          <Icon type="question-circle-o" />
				        </Tooltip>
				      </span>
				    )}
				  >
				    {
				    	getFieldDecorator('nickname', {
				      		rules: [
				      			{ required: true, message: 'Please input your nickname!', whitespace: true }
				      		],
				    	})( <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
				    }
				  </FormItem>
				{/*---------------手机号码--------------------*/}
				  <FormItem
				    label="手机号码"
				    hasFeedback
				  >
				    {
				    	getFieldDecorator('phone', {
				      		rules: [
				      			{ required: true, message: 'Please input your phone number!' }
				      		],
				    	})(
				    		<Input 
				    			addonBefore={prefixSelector} 
				    			prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
				    			style={{ width: '100%' }} 
				    		/>
				    	)
				    }
				  </FormItem>

				  <FormItem >
				    <Button type="primary" htmlType="submit" style={{width: '100%'}}>保 存</Button>
				  </FormItem>

				</Form>
			</div>
		)
	}
}
const Changepwd = Form.create()(ChangeFrom);
export default connect(mapStateToProps)(Changepwd);