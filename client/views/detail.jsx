import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Layout
} from 'antd';

// import store from '../store/Store';
import DetailComponents from './details';

/*const userInfo = store.getState().userData[1];
const bookInfo =  store.getState().bookInfo.books[1];
const booksdata =  [store.getState().goodsilderBooks];*/
export default class Details extends Component {
	static contextTypes = {
		store: PropTypes.object
	}
	constructor() {
		super(...arguments)
		
		this.state = {
			userInfo: this.context.store.getState().asyncReducer.userData[1],
			bookInfo: this.context.store.getState().asyncReducer.books[1],
			booksdata: [this.context.store.getState().asyncReducer.goodsilderBooks],
			isLogin: false
		}
	}

	render() {
		const { Header , Content ,Sider } = Layout;
		const { userInfo, booksdata, bookInfo } = this.state;
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
