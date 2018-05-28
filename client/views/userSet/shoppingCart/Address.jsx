import React,{Component} from 'react';
import { Icon } from 'antd'

require('./shopping.scss')
const Item = ({datas}) => {
	return (
		<li className="address_item">
			<span>{datas.provinces}</span>
			<span>{datas.address}</span>
			<span>{datas.mailCode}</span>
			<span>{`(${datas.userName})  收`}</span>
			<span>{datas.tel}</span>
		</li>
	)
}

const data = [
	{
		userName: '李文辉',
		tel: '15727785909',
		mailCode:'000000',
		provinces: '江西',
		address: '江西省南昌市江西农业大学南区14栋418'
	}
]

export default class Address extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h3 className="address_header taxt_blue_color border_bottom  padding_all">
					收货地址
					<span className="add_address"><Icon type="plus" title="添加收货地址" /></span>
				</h3>
				<ul className="address_container paddingNone">
					<li className="address_editor taxt_blue_color">
						<Icon type="edit" title="编辑" />
						<Icon className="address_delete" type="close" title="删除" />
					</li>
					{
						data.map((item,key) => {
							return (
								<Item datas={item} key={key} />
							)
						})
					}
				</ul>
			</div>
		)
	}
}