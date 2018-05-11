import React from 'react';
import { List, Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';


require('./sider.scss')

/*------热门书籍item项组件--------*/
const ListItem = ({item}) => {
	return (
		<List.Item className="text-overflow">
		<a src = ''>
			 <Avatar shape="square" style={{ backgroundColor: '#87d068' }} icon="book" />
			{item.content}
		</a>
		</List.Item>
	)
}
/*--------侧边栏底部查看更多--------*/
const Footer = () => {
	return (
		<div className="footer">
			<a >查看更多<Icon type="double-right" /></a>
		</div>
	)
}

const HotBooks = ({data}) => {
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
				      renderItem={item => (<ListItem item = {item} />)}
				    />
				</div>
			)
		})
	)
}

HotBooks.propTypes = {
	data: PropTypes.array.isRequired
}
export default HotBooks;