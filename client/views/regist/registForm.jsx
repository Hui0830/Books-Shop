import React from 'react';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const RegistFrom = ({form,loading, handleSubmit, validateToNextPassword, residences, compareToFirstPassword, handleConfirmBlur}) => {
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
		  {/*---------------手机号码--------------------*/}
		  <FormItem
		    label="手机号码"
		    hasFeedback
		  >
		    {
		    	getFieldDecorator('tel', {
		      		rules: [
		      			{ required: true, message: '请输入正确的手机号码!',pattern:/^[1][3,4,5,7,8][0-9]{9}$/ }
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
		  {/*---------------昵称--------------------*/}
		  <FormItem
		  	hasFeedback
		    label={(
		      <span>
		        昵称
		        <Tooltip title="您的用户名?">
		          <Icon type="question-circle-o" />
		        </Tooltip>
		      </span>
		    )}
		  >
		    {
		    	getFieldDecorator('username', {
		      		rules: [
		      			{ required: true, message: '记得给自己取个名字哦!', whitespace: true }
		      		],
		    	})( <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
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
			        		required: true, message: '密码必须为6~20位的非中文字符哦!',min:6,max:20
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
		    	getFieldDecorator('password2', {
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
		
		{/*---------------学校选择--------------------*/}
		  <FormItem
		    label="学校"
		    hasFeedback
		  >
		    {
		    	getFieldDecorator('school', {
		      		initialValue: ['江西', '江西农业大学'],
		      		rules: [
		      			{ type: 'array', required: true, message: '告诉大家你在哪里哦!' }
		      		],
		    	})(<Cascader options={residences} />)
		    }
		  </FormItem>
		{/*-------------性别--------------*/}
			<FormItem
	          label="性别"
	          labelCol={ {span:4} }
	          wrapperCol={ {span:20} }
	          style={{textAlgin:'left'}}
	        >
	          {getFieldDecorator('sex',{
	          	      rules: [
	          		      {
	          		        required: true, message: '确认你的性别哦!',
	          		      }
	          	      ],
	          })(
	            <RadioGroup>
	              <Radio value="man">男</Radio>
	              <Radio value="woman">女</Radio>
	            </RadioGroup>
	          )}
			</FormItem>

		  <FormItem >
		    {getFieldDecorator('agreement', {
		      valuePropName: 'checked',
		    })(
		      <Checkbox>I have read the <a href="">agreement</a></Checkbox>
		    )}
		  </FormItem>

		  <FormItem >
		    <Button loading={loading} type="primary" htmlType="submit" style={{width: '100%'}}>注册</Button>
		  </FormItem>

		</Form>
	)
}
export default RegistFrom