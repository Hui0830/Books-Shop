import React,{Component} from 'react';
import { Steps, Button, message,Icon,Form,Input,Select} from 'antd';
import { connect } from 'react-redux';

require('./shop_1.scss')
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

const BindAccount = ({type,loading,handleSubmit,bindAccountType,form}) => {
	const {getFieldDecorator} = form;
	const prefixSelector = getFieldDecorator('prefix', {
	  initialValue: type,
	})(
	  <Select style={{ width: 70 }}>
	    <Option value="alipay"><Icon type="alipay" /></Option>
	    <Option value="wechat"><Icon type="wechat"/></Option>
	  </Select>
	);

	return [
		<h3>{bindAccountType(type)}</h3>,
		
			type === "bank" ? null :
			<Form onSubmit={() => handleSubmit(e,form)} className="login-form">
				<FormItem
				  label="账户类型："
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
			  <FormItem 
			    label="账 户 名："
			    hasFeedback
			    
			  >
			    {getFieldDecorator('userName', {
			      rules: [{ required: true, message: 'Please input your username!' }],
			    })(
			     <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
			    )}
			  </FormItem>
			  <FormItem label="密   码：" hasFeedback>
			    {getFieldDecorator('password', {
			      rules: [{ required: true, message: 'Please input your Password!' }],
			    })(
			      <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
			    )}
			  </FormItem>
			  <FormItem>
			    <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
			     确认绑定
			    </Button>
			  </FormItem>
			</Form>
		
	]
}
const BindAccountForm = Form.create()(BindAccount);

const mapStateToProps = (state,ownProps) => {
  const { bankAccount } = state.userInfoData.userInfo;
  return {
    bankAccount
  }
}
const Item = ({datas}) => {
	return (
		<li className="account_item">
			<span><Icon type={datas.type} />绑定账户:</span>
			<span className="taxt_blue_color">{datas.account}</span>
			<span>账户名:</span>
			<span className="taxt_blue_color">{datas.accountName}</span>
		</li>
	)
}
class BankAccount extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  current: 0,
		  type:this.props.bankAccount.type || "alipay",
		  loading: false,
		  steps: [
			    '账户类型',
			    '绑定账户',
			    '完成'
		    ],
		    bankAccount:this.props.bankAccount
		};


		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this)
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
				return <BindAccountForm loading={this.state.loading} type={this.state.type} bindAccountType={this.bindAccountType} handleSubmit={this.handleSubmit}  />
			default: 
				return <span><Icon type="frown-o" />很抱歉，银行账户类型暂时未开放！</span>
		}
	}
	bindAccountType(type) {
		switch (type) {
			case 'alipay':
				return <span><Icon type="alipay" onClick={() => this.selectType("alipay")} />绑定支付宝账号</span>
			case 'wechat':
				return <span><Icon type="wechat" onClick={() => this.selectType("wechat")} />绑定微信账号</span>
			default:
				return <span><Icon type="frown-o" />很抱歉，银行账户类型暂时未开放！</span>
		}
	}
	handleSubmit(e,form) {
    e.preventDefault();
    this.setState({
    	loading: true
    })
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
        	loading: false,
        	bankAccount: {
        		type: this.state.type,
        		account: values.userName,
        		accountName: values.userName

        	}
        })
      }
    });
  	}
  	handleEdit() {
  		this.setState({
  			bankAccount: null
  		})
  	}
  	handleCancel() {
  		this.setState({
  			bankAccount: this.props.bankAccount
  		})
  	}
  	selectType(type) {
  		this.setState({
  			type: type
  		})
  	}
	render() {
		const { current,steps,bankAccount } = this.state;
		return (
			<div className="bank_container">
				<h3 className="bank_header taxt_blue_color border_bottom  padding_all">
					<Icon type="bank" className="taxt_blue_color" />收款账号设置
				</h3>
				{
					bankAccount  
					? 
					<ul className="account_container paddingNone">
						<li className="account_editor taxt_blue_color">
							<Icon type="edit" title="编辑" onClick={() => this.handleEdit()} />
							<Icon className="account_delete" type="close" title="删除" />
						</li>
						<Item datas={bankAccount} />
						
					</ul>
					:
					<div>
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
					    	<Button className="float_right" type="primary" onClick={() => this.handleCancel()}>取消</Button>
					  	}
						  
						</div>
					</div>
				}
				
			</div>
		)
	}
}
export default connect(mapStateToProps)(BankAccount)