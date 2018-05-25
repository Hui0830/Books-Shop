import React, { Component } from 'react';
import {
	Layout
} from 'antd';

import store from '../store/Store';
import DetailComponents from './details';

const userInfo = store.getState().userData[1];
const bookInfo =  store.getState().bookInfo.books[1];
const booksdata =  [store.getState().goodsilderBooks];
export default class Details extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLogin: false
		}

		console.log(userInfo)
	}

	render() {
		const { Header , Content ,Sider } = Layout;
		return (
				<Layout className="gray_bgColor">
				  <Sider width='300' className="white_bgColor">
				 	<DetailComponents.UserInfo userInfo = {userInfo} />
				  	<DetailComponents.SellBooks booksdata = {booksdata} />
				  </Sider>
				  <Content className="margin_left">
				  	<DetailComponents.BookInfo bookInfo = {bookInfo} />
				  	
				  </Content>
				</Layout>
		)
	}
}