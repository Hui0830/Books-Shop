import React,{Component} from 'react';
import {
	Icon,
	List,
	Avatar
} from 'antd'

require('./booksList.scss')


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

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
			<div className="contentHeader">
				<div className="title">
					<span>热门书籍</span>
				</div>
				<div className="more">
					<a >查看更多<Icon type="double-right" /></a>
				</div>
			</div>,
			<List
				key="goodBooks"
			    itemLayout="vertical"
			    size="large"
			    pagination={{
			    onChange:(page) => {
			        console.log(page);
			      },
			      defaultPageSize: 3,
			      pageSize: 3,
			    }}
			    dataSource={listData}
			    footer={<div><b>ant design</b> footer part</div>}
			    renderItem={item => (
			      <List.Item
			        key={item.title}
			        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
			        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
			      >
			        <List.Item.Meta
			          avatar={<Avatar src={item.avatar} />}
			          title={<a href={item.href}>{item.title}</a>}
			          description={item.description}
			        />
			        {item.content}
			      </List.Item>
			    )}
			  />
		]
	}
}