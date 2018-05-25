import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {Layout, Pagination, Icon, Tabs, Button} from 'antd';

import store from '../../store/Store';
import Books from '../components/vertical/VerticalList';
import MySearch from '../home/search';
import UserInfo from '../components/siderUser/user';

const userInfo = store.getState().userData[Math.floor(Math.random(1,10))];
const books = store.getState().bookInfo.books;
const isLogin = store.getState().user.isLogin;

class ProductShow extends Component {

	constructor(props){
		super(props)
		this.state = {
			books: books,
			listData: books.slice(0,6),
			isUp: false,
			pageSize: 6,
			total: books.length,
			current: 1
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this)

	}
	/*-------排序事件---------*/
	handleSort(e,type) {
		let {isUp, books} = this.state;
		books.sort((next, prev) => {
			if(isUp) {
				return prev[type]-next[type]
			}else {
				return next[type]-prev[type]
			}
			
		})
		console.log(books);
		this.setState({
			listData: books,
			isUp: !isUp
		})
	}
	/*-------分页事件-------*/
	handleChange(page,pageSize) {
		const { books } = this.state;
		this.setState({
			listData: books.slice(page*6-pageSize,page*pageSize),
			current: page,
		})
	}

	callback(key) {
	  console.log(key);
	}

	render() {
		const {Content, Sider} = Layout;
		const { TabPane } = Tabs
		return (
			<Layout>
				
				<Sider width={300} className="white_bgColor">
					<div className="siderContainer" key={`slider`}>
						<UserInfo userInfo={userInfo} />
						{
							isLogin ?  
							<Button type="primary" style={{width: '100%'}}>保 存</Button> : 
							<Button type="primary" style={{width: '100%'}}><Link to="/login">登录可查看联系方式</Link></Button>
						}
					</div>

				</Sider>
				<Content className="gray_bgColor margin_left">

					

					<Tabs defaultActiveKey="1" className="white_bgColor" onChange={this.callback}>
					    <TabPane tab="出售" key="1">
					    	<div className="book_search white_bgColor">
					    		<MySearch />
					    	</div>
					    	<div className="books_container white_bgColor padding_all  margin_top overflow_hidden">
    							<div className="sorter border_bottom">
    								<ul>
    									<li  className="inline_li">排序: </li>
    									<li onClick={() => this.handleSort("id")} className="inline_li"><Icon type={this.state.isUp?"up":"down"} />上架时间</li>
    									<li onClick={() => this.handleSort("collect")} className="inline_li"><Icon type={this.state.isUp?"up":"down"} />留言数</li>
    									<li onClick={() => this.handleSort("price")} className="inline_li"><Icon type={this.state.isUp?"up":"down"} />售价</li>
    								</ul>
    								<Pagination
    									current={this.state.current} 
    									hideOnSinglePage={true}
    									total={books.length}
    									pageSize= {6}
    									size="small"
    									onChange={ (page,pageSize) => this.handleChange(page,pageSize)}
    								/>
    							</div>

    							<Books className="white_bgColor" listData={this.state.listData} />
    							<Pagination
    								className="float_right"
    								hideOnSinglePage={true}
    								total={books.length}
    								current={this.state.current}
    								pageSize= {6}
    								size="small"
    								onChange={ (page,pageSize) => this.handleChange(page,pageSize)}
    							/>

    						</div>
					    </TabPane>

					    <TabPane tab="关注" key="2">
					    	Content of Tab Pane 2
					    </TabPane>
					    <TabPane tab="粉丝" key="3">
					    	Content of Tab Pane 3
					    </TabPane>
					</Tabs>
					
				</Content>
			</Layout>
		)
	}
}
export default ProductShow;