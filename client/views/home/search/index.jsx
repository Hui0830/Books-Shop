import React,{ Component } from 'react';
import {
	Input,
	Row,
	Col
} from 'antd'

export default class MySearch extends Component {
	constructor(props) {
		super(props)

		this.state = {

		}

		this.searchHandle = this.searchHandle.bind(this)
	}

	searchHandle() {

	}

	render() {
		const {Search} = Input;
		return (
			<Row type="flex" className = "search-container">
				<Col 
					span = {12}
				>
					<ul>
						<li className="inline-li"><label>热搜：</label></li>
						<li className="inline-li"><a>英语</a></li>
						<li className="inline-li"><a>计算机</a></li>
						<li className="inline-li"><a>数学</a></li>
						<li className="inline-li"><a>法律</a></li>
						<li className="inline-li"><a>经济 CET4</a></li>
					</ul>
				</Col>
				<Col span = {12} >
					<Search
				    placeholder="input search text"
				    onSearch={value => console.log(value)}
				    enterButton
					/>
				</Col>
			</Row>
		)
			
	}
}