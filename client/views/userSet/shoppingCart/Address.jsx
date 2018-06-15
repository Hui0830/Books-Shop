import React,{Component} from 'react';
import { Icon,Form } from 'antd'
import { connect } from 'react-redux';
import AddressEdit from './addressEdit.jsx';

require('./shopping.scss')
const Item = ({datas}) => {
	return (
		<li className="address_item text_hidden">
			<span>{datas.provinces}</span>
			<span>{datas.address}</span>
			<span>{datas.mailCode}</span>
			<span>{`(${datas.userName})  收`}</span>
			<span>{datas.tel}</span>
		</li>
	)
}
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
/*const data = [
	{
		userName: '李文辉',
		tel: '15727785909',
		mailCode:'000000',
		provinces: '江西',
		address: '江西省南昌市江西农业大学南区14栋418'
	}
]*/
const mapStateToProps = (state,ownProps) => {
  const { address } = state.userInfoData.userInfo;
  return {
    address,
    status
  }
}
 class Address extends Component {
	constructor(props) {
		super(props),
		this.state = {
			address: this.props.address,
			visible: false,
			confirmLoading: false,
		}

		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	showModal(){
	  this.setState({
	    visible: true,
	  });
	}
	// 注册提交事件
	handleSubmit(e){
	  e.preventDefault();
	  this.props.form.validateFieldsAndScroll((err, values) => {
	    if (!err) {
	      console.log('Received values of form: ', values);
	      this.setState({
	        address: values,
	        confirmLoading: true,
	      });
	      setTimeout(() => {
	        this.setState({
	          visible: false,
	          confirmLoading: false,
	        });
	      }, 2000);
	    }
	  });
	}
	handleCancel(){
	  console.log('Clicked cancel button');
	  this.setState({
	    visible: false,
	  });
	}

	render() {
		const {visible,confirmLoading,address} = this.state;
		return (
			<div>
				<h3 className="address_header taxt_blue_color border_bottom  padding_all">
					收货地址
					<span className="add_address"><Icon type="plus" title="添加收货地址" /></span>
				</h3>
				{
					this.props.address.map((item,key) => {
						return (
							<ul className="address_container paddingNone margin_top">
								<li className="address_editor taxt_blue_color">
									<Icon type="edit" title="编辑" onClick={()=>this.showModal()} />
									<Icon className="address_delete" type="close" title="删除" />
								</li>
								<Item datas={item} key={key} />
							</ul>
						)
					})
				}
				<AddressEdit form={this.props.form} residences={residences} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} address={address} visible={visible} confirmLoading={confirmLoading}  />
				
			</div>
		)
	}
}
const AddressForm = Form.create()(Address);
export default connect(mapStateToProps)(AddressForm)