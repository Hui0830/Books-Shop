import React from 'react';
import { List, Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


require('./index.scss')

/*------热门书籍item项组件--------*/
const ListItem = ({item, type}) => {
	const path = type === 'hotBook' ? '/product' : ('/user/'+item.id);
	return (
		<List.Item className="text-overflow hover">
		<Link to ={ path} title={ item.name }>
			 
			 {
			 	item.img ? 
			 	<Avatar 
			 	shape="square" 
			 	style={{ backgroundColor: '#87d068' }} 
			 	src={item.img} 
			 	 
			 	/> :
			 	<Avatar 
			 	shape="square" 
			 	style={{ backgroundColor: '#87d068' }} 
			 	icon="book"
			 	/>
			 }
			{item.name}&nbsp;&nbsp;&nbsp;&nbsp;{`(${item.collect})`}
		</Link>
		</List.Item>
	)
}
/*--------侧边栏底部查看更多--------*/
const Footer = ({path}) => {
	return (
		<div className="footer">
			<Link to="/path/?q=all" >查看更多<Icon type="double-right" /></Link>
		</div>
	)
}

const SiderList = ({data}) => {
	return (
		data.map((siderItem,index) => {
			return (
				<div className="siderContainer" key={`${index}slider`}>
					<h3 className="header">{siderItem.header}</h3>
				    <List
				      size="small"
				      footer={<Footer />}
				      bordered
				      dataSource={siderItem.data}
				      renderItem={item => (<ListItem item = {item} type = {siderItem.type} />)}
				    />
				</div>
			)
		})
	)
}

SiderList.propTypes = {
	data: PropTypes.array.isRequired
}
export default SiderList;