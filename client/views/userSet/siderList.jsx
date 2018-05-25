import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu, Item } = Menu;

const Title = ({type, content}) => {
	return (
		<span>
			<Icon type={type} />
			<span>{content}</span>
		</span>
	)
}
const SiderList = ({menuData}) => {
	return (
		<Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
		  	{
		  		menuData.map((item,index) => {
		  				return(
		  					<SubMenu key={index} title={<Title type={item.type} content={item.content} />} >
		  					{
		  						item.items.map((itemChild,key) => {
		  							return(
		  								<Item key={`itemChild_${key}`}>
		  									<Link to={`/userSet${itemChild.path}`}> 
		  										{itemChild.content}
		  									</Link>
		  								</Item>
		  							)
		  						})
		  					}
		  				</SubMenu>
		  				)
		  		})
		  	}
		</Menu>
	)
}
SiderList.propTypes = {
	menuData: PropTypes.array.isRequired
}
export default SiderList