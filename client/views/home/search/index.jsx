import React,{ Component } from 'react';
import {
	Input,
	Row,
	Col
} from 'antd'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export default class MySearch extends Component {
	static contextTypes = {
		router: PropTypes.object
	}
	constructor(props) {
		super(props)
		this.searchHandle = this.searchHandle.bind(this)
	}

	searchHandle(value) {
		this.context.router.history.push(`/product/?search=${value}`);
	}

	render() {
		const {Search} = Input;
		return (
			<Row type="flex" className = "search-container">
				<Col 
					span = {12}
				>
					<ul>
						<li className="inline_li"><label>热搜：</label></li>
						<li className="inline_li"><Link to="/product/?search=英语">英语</Link></li>
						<li className="inline_li"><Link to="/product/?search=计算机">计算机</Link></li>
						<li className="inline_li"><Link to="/product/?search=数学">数学</Link></li>
						<li className="inline_li"><Link to="/product/?search=法律">法律</Link></li>
						<li className="inline_li"><Link to="/product/?search=经济">经济 CET4</Link></li>
					</ul>
				</Col>
				<Col span = {12} >
					<Search
				    placeholder="input search text"
				    onSearch={value => this.searchHandle(value)}
				    enterButton
					/>
				</Col>
			</Row>
		)
			
	}
}