import React ,{ Component } from 'react';
import {
	Icon,
	Row,
	Col,
	Divider
} from 'antd';
import { Link } from 'react-router-dom';

import SelectSchool from './selectSchool';
import './appBar.pcss'


/*const navList = [
	{content: '首页', url: '/home', id: '1'},
	{content: '详情页', url: '/detail', id: '2'},
	{content: '更多', url: '/more', id: '3'},
	{content: '登入', url: '/login', id: '4'},
	{content: '注册', url: '/out', id: '5'},
];*/

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
		console.log(city)
		let school= this.props.schoolData.filter((element, index,arr) => {
			return element.city === city;
		})
		console.log(school.length === 0)
		if (school.length === 0) {
			alert('暂时没有数据');
			school.push(this.state.school);
			console.log(school)
		}
		this.setState({
			school: school[0]
		})
	}
	/*school标签选择触发函数*/
	selectSchool(e) {
		console.log(e.target.title)
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
		console.log(this.state.school)
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
		const { city } = this.props;
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
            
		            <Link to="/login">
		              <Icon type="user"/>
		              登录
		            </Link>
		            <Divider type="vertical" />
		            <Link style={{color:"rgb(1,200,181)"}} to="/regist">
		              <Icon type="user-add" />立即注册
		            </Link>               
          		</div>
            </Col>
          </Row>
		)
	}
}

export default NarBar;