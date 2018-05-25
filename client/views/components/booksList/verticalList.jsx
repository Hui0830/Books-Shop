import React,{Component} from 'react';
import {
	Icon,
	List,
	Avatar
} from 'antd'

import BookItem from './bookItem';
require('./booksList.scss')


const Item = ({item}) => {
	return (
		<List.Item>
			<BookItem bookInfo={item} />
		</List.Item>
	)
}
export default class VerticalList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			listData: this.props.listData,
		}

		this.pageHandle = this.pageHandle.bind(this)
	}
	componentDidMount() {
		console.log(this.props.listData)
	}
	pageHandle(page) {
		console.log(page)
	}

	render() {
		const {listData} = this.props;
		return [
			<List
				key="goodBooks"
			    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 3 }}
			    size="large"
			    dataSource={listData}
			    renderItem={(item) => <Item item={item} />}
			  />
		]
	}
}