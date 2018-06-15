import React,{Component} from 'react';
import { Icon,Button } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {getPageData} from 'actions/Action';

// import store from '../../../store/Store';
require('./user.scss');

// const userInfo = store.getState().userData[0];

const mapStateToProps = (state,ownProps) => {
	console.log(state)
	const { userInfo } = state.userInfoData;
	return {
		userInfo
	}
}

 class PersonSet extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor() {
		super(...arguments)
		// this.state = {
		// 	userInfo: this.context.store.getState().userData[0]
		// }
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.context.router.history.push({
			pathname: '/userSet/changepwd'
		})
	}
	render() {
		console.log(this.props)
		const {userInfo} = this.props;
		return (
			<div className="user_set overflow_hidden border_l_t">
		            <ul className="paddingNone user_set_list">
		            	<li>
		            		<span><Icon type="eye-o" />头像：</span>
		            		<img className="user_profile" src={userInfo.avatar} alt="墨香书阁" />
		            	</li>
		                <li><span><Icon type="user" />用户名：</span>{ userInfo.userName }</li>
		                <li><span><Icon type={userInfo.sex === '男' ? "man" : "woman"} />性 别：</span>{ userInfo.sex }</li>
		                <li><span><Icon type="environment-o" />学 校：</span>{ `${userInfo.city}-${userInfo.school}` }</li>
		                <li><span><Icon type="phone" />电 话：</span>{ userInfo.tel }</li>
		                <li className="submin_btn algin_right">
		                	<Button onClick={this.handleClick} type="primary" icon="form">编 辑</Button>
		                </li>
		            </ul>
			</div>
		)
	}
}
export default connect(mapStateToProps)(PersonSet)