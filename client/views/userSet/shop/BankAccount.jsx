import React,{Component} from 'react';
import { Steps, Button, message,Icon,Form,Input} from 'antd';
require('./shop.scss')
const Step = Steps.Step;
const FormItem = Form.Item;

const BindAccount = ({type,handleSubmit,bindAccountType,form}) => {
	const {getFieldDecorator} = form;
	return [
		<h3>{bindAccountType(type)}</h3>,
		
			type === "bank" ? null :
			<Form onSubmit={handleSubmit} className="login-form">
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
			    <Button type="primary" htmlType="submit" className="login-form-button">
			      Log in
			    </Button>
			  </FormItem>
			</Form>
		
	]
}
const BindAccountForm = Form.create()(BindAccount);
export default class BankAccount extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  current: 0,
		  type:"alipay",
		  steps: [
			    '账户类型',
			    '绑定账户',
			    '完成'
		    ]
		};

		this.handleSubmit = this.handleSubmit.bind(this)
	}
	next(e) {
	  const current = this.state.current + 1;
	  const type = e.target.title;
	  this.setState({ current,type });
	}
	prev() {
	  const current = this.state.current - 1;
	  this.setState({ current,type:"alipay" });
	}
	getContent(current) {
		switch (current) {
			case 0: 
				return (
						<p className="account_type">
					  	  	<Icon onClick={(e) => this.next(e)} title="alipay" type="alipay" />
					  	  	<Icon onClick={(e) => this.next(e)} title="wechat" type="wechat" />
					  	  	<Icon onClick={(e) => this.next(e)} title="bank" type="bank" />
			    		</p>
			    	)
			case 1: 
				return <BindAccountForm type={this.state.type} bindAccountType={this.bindAccountType} handleSubmit={this.handleSubmit}  />
			default: 
				return <span><Icon type="frown-o" />很抱歉，银行账户类型暂时未开放！</span>
		}
	}
	bindAccountType(type) {
		switch (type) {
			case 'alipay':
				return <span><Icon type="alipay" />绑定支付宝账号</span>
			case 'wechat':
				return <span><Icon type="wechat" />绑定微信账号</span>
			default:
				return <span><Icon type="frown-o" />很抱歉，银行账户类型暂时未开放！</span>
		}
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
		const { current,steps } = this.state;
		return (
			<div className="bank_container">
				<h3 className="bank_header taxt_blue_color border_bottom  padding_all">
					<Icon type="bank" className="taxt_blue_color" />收款账号设置
				</h3>
				<Steps current={current}>
				  {steps.map(item => <Step key={item} title={item} />)}
				</Steps>
				<div className="steps-content border_all">
					{
						this.getContent(current)
					}
				</div>
				<div className="steps-action overflow_hidden">
				{
					this.state.current > 0
					&&
					<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
				    上一步
					</Button>
				}
			  	{
			   		/*this.state.current < steps.length - 1
			    	&&
			    	<Button className="float_right" type="primary" onClick={() => this.next()}>下一步</Button>*/
			  	}
			  	{
			    	this.state.current === steps.length - 1
			    	&&
			    	<Button className="float_right" type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
			  	}
				  
				</div>
			</div>
		)
	}
}
