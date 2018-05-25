import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;



const RegistFrom = ({form, handleSubmit, validateToNextPassword, residences, compareToFirstPassword, handleConfirmBlur}) => {
	const { getFieldDecorator } = form;

	const prefixSelector = getFieldDecorator('prefix', {
	  initialValue: '86',
	})(
	  <Select style={{ width: 70 }}>
	    <Option value="86">+86</Option>
	    <Option value="87">+87</Option>
	  </Select>
	);

	return (
		<Form onSubmit={handleSubmit} style={{margin: "10px auto",padding: "0 100px"}}>
		  {/*---------------邮箱--------------------*/}
		  <FormItem
		    label="注册邮箱"
		    hasFeedback
		  >
		    {
		    	getFieldDecorator('email', {
			      rules: [
				      {
				        type: 'email', message: '请输入正确的邮箱地址!',
				      }, 
				      {
				        required: true, message: '请输入你的邮箱!',
				      }
			      ],
		    	})(<Input  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
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
			        		validator: validateToNextPassword,
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
				        validator: compareToFirstPassword,
				      }
			      ],
		    	})(<Input type="password" onBlur={handleConfirmBlur} prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
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
		{/*---------------学校选择--------------------*/}
		  <FormItem
		    label="学校"
		    hasFeedback
		  >
		    {
		    	getFieldDecorator('residence', {
		      		initialValue: ['zhejiang', 'hangzhou', 'xihu'],
		      		rules: [
		      			{ type: 'array', required: true, message: 'Please select your habitual residence!' }
		      		],
		    	})(<Cascader options={residences} />)
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
		    {getFieldDecorator('agreement', {
		      valuePropName: 'checked',
		    })(
		      <Checkbox>I have read the <a href="">agreement</a></Checkbox>
		    )}
		  </FormItem>

		  <FormItem >
		    <Button type="primary" htmlType="submit" style={{width: '100%'}}>Register</Button>
		  </FormItem>

		</Form>
	)
}
export default RegistFrom