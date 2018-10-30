import React ,{ Component } from 'react';
import {
	Icon,
	Row,
	Col,
	Divider
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {cookie} from '../../../until/cookie.js';
import {login_out} from 'actions/loginAction.js';

import SelectSchool from './selectSchool';
import './appBar.scss'

const mapStateToProps = (state,ownProps) => {
	const { loginInOutReducer } = state;
	return {
		...loginInOutReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loginOut: () => {
			cookie.del('userId');
			dispatch(login_out());
		}
	}
}

class NarBar extends Component {
	constructor(props){
		super(props)

		this.state ={
			visible: false,
			loading: false,
			school: this.props.schoolData[0]
		}

		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.selectSchool = this.selectSchool.bind(this);
		this.selectCity = this.selectCity.bind(this)

	}
	/*展示学校选择面板*/
	showModal() {
		this.setState({
			visible: true
		})
	}
	/*取消学校选择面板*/
	handleCancel() {
		this.setState({
			visible: false
		})
	}
	/*city标签选择触发函数*/
	selectCity(e) {
		const city = e.target.title;
		let school= this.props.schoolData.filter((element, index,arr) => {
			return element.city === city;
		})
		if (school.length === 0) {
			alert('暂时没有数据');
			school.push(this.state.school);
		}
		this.setState({
			school: school[0]
		})
	}
	/*school标签选择触发函数*/
	selectSchool(e) {
		this.setState({
			loading: true,
			visible: false
		})
		setTimeout(() => {
			this.setState({
				loading: false
			})
		},3000)
	}
	/*选择所有学校*/
	selectAll() {
		this.setState({
			loading: true
		})
		setTimeout(() => {
			this.setState({
				loading: false
			})
		},1000)
	}
	render() {
		const { visible, loading, school } = this.state;
		const { city, isLogin, userInfo,loginOut } = this.props;
		const seleceProps = {
			visible,
			loading,
			school,
			city,
			showModal: this.showModal,
			handleCancel: this.handleCancel,
			selectCity: this.selectCity,
			selectSchool: this.selectSchool,
			selectAll: this.selectAll
		}
		return (
          <Row type = "flex" justify="center" style={{ height: '30px',lineHeight: '30px', width: '100%',background: 'rgb(51,51,51)' }}>
            <Col xs={10}>
            	<SelectSchool {...seleceProps} />
            </Col>
            <Col xs={10}>
            	<div className="top_user_info" key="top_user">
            		{
            			!!(isLogin || cookie.get('userId'))? 
            			(
            				<div>
            				<Link to={`/userSet/?userId=${userInfo.id}`}>
	            			  <Icon type="user"/>
	            			  {userInfo.username}
	            			</Link>
	            			<Divider type="vertical" />
	            			<Link to={`/userSet/shoppingCart/?userId=${userInfo.id || cookie.get('userId')}`}>
	            			  <Icon type="shopping-cart"/>
	            			  我的购物车
	            			</Link>
	            			<Divider type="vertical" />
	            			<a className="taxt_blue_color cursor_pointer" href="/login" onClick={() => loginOut()}>
	            			  <Icon type="logout" />退出登入
	            			</a>
	            			</div>
	            		) :
	            		(
	            			<div>
	            			<Link to="/login">
	            			  <Icon type="login"/>
	            			  登录
	            			</Link>
	            			<Divider type="vertical" />
	            			<Link className="taxt_blue_color" to="/regist">
	            			  <Icon type="user-add" />立即注册
	            			</Link>
	            			</div>
	            		)
            		}              
          		</div>
            </Col>
          </Row>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NarBar);