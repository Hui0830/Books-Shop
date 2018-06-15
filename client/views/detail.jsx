import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Layout
} from 'antd';
import {connect } from 'react-redux';


import { getPageData } from '../action/Action.js';
import store from '../store/Store';
import DetailComponents from './details';

import Loading from 'components/loading/loading'

const mapStateToProps = (state,ownProp) => {
	const { goodsilderBooks } = state.asyncReducer;
	const { userInfo, book,status } = state.detailData;
	const { isLogin } = state.loginInOutReducer;
	console.log(status)
	return {
		goodsilderBooks,
		userInfo,
		book,
		status,
		isLogin
	}
}

 class Details extends Component {
 	static contextTypes = {
 		router: PropTypes.object
 	}
	constructor() {
		super(...arguments);

		
	}
	componentDidMount() {
		const bookId = this.context.router.route.match.params.id;
		store.dispatch(getPageData("detailPage",{bookId},'/detail'));
	}
	// shouldComponentUpdate(nextProps,nextState){
	// 	console.log(nextState,nextProps,"this.props:",this.props)
	// 	if (nextProps.match.params.id === this.props.match.params.id) {
	// 		return false;
	// 	} else {
	// 		store.dispatch(getPageData("detailPage",{bookId:nextProps.match.params.id},'/detail'));
	// 	}
	// 	return true
	// }
	render() {
		const { Header , Content ,Sider } = Layout;
		const { userInfo, goodsilderBooks, book,status,match } = this.props;
		return (
			
				status === 'success' ? 

				<Layout className="gray_bgColor">
				  <Sider width='300' className="white_bgColor">
				 	<DetailComponents.UserInfo userInfo = {userInfo} />
				  	<DetailComponents.SellBooks booksdata = {[goodsilderBooks]} />
				  </Sider>
				  <Content className="margin_left">
				  	<DetailComponents.BookInfo bookInfo = {book} />
				  	
				  </Content>
				</Layout>:<Loading loading={true} /> 
			
		)
	}
}
export default connect(mapStateToProps)(Details)