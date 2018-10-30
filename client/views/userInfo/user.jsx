import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {Layout, Pagination, Icon, Tabs, Button} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SellerBooks from '../components/vertical/VerticalList';
import MySearch from '../home/search';
import UserInfo from '../components/siderUser/user';
import Loading from 'components/loading/loading';

import {getPageData} from '../../action/Action.js';
import { cookie } from '../../until/cookie.js';

const mapStateToProps = (state,ownProps) => {
	const { isLogin } = state.loginInOutReducer;
	const { sellerInfo,sellerBooks,sellerFans,status } = state.sellerData;
	return {
		isLogin,
		sellerInfo,
		sellerBooks,
		sellerFans,
		status

	}
}

class ProductShow extends Component {
	static contextTypes = {
		store: PropTypes.object,
		router: PropTypes.object
	}
	constructor(){
		super(...arguments)
		this.state = {
			sellerBooks: this.props.sellerBooks,
			sellerFans: this.props.sellerFans,
			listData: this.props.sellerBooks.slice(0,6),
			isUp: false,
			pageSize: 6,
			total: this.props.sellerBooks.length,
			current: 1
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this)

	}
	componentDidMount() {
		const sellerId = this.context.router.route.match.params.id;
		this.context.store.dispatch(getPageData('sellerPage',{sellerId},'/seller'))
	}
	/*-------排序事件---------*/
	handleSort(e,type) {
		let {isUp, sellerBooks} = this.state;
		sellerBooks.sort((next, prev) => {
			if(isUp) {
				return prev[type]-next[type]
			}else {
				return next[type]-prev[type]
			}
			
		})
		this.setState({
			listData: sellerBooks,
			isUp: !isUp
		})
	}
	/*-------分页事件-------*/
	handleChange(page,pageSize) {
		const { sellerBooks } = this.state;
		this.setState({
			listData: sellerBooks.slice(page*6-pageSize,page*pageSize),
			current: page,
		})
	}

	callback(key) {
	  console.log(key);
	}

	render() {
		const {Content, Sider} = Layout;
		const { TabPane } = Tabs;
		const { current,sellerBooks,listData,isUp } = this.state;
		const { sellerInfo,isLogin } = this.props;
		return (
			this.props.status === 'success' ?
			<Layout>
				
				<Sider width={300} className="white_bgColor">
					<div className="siderContainer" key={`slider`}>
						<UserInfo userInfo={sellerInfo} />
						{
							!!(isLogin || cookie.get('userId')) ?  
							<ul className="padding_all margin_top user_connect ">
				                <li className="letter_spacing"><Icon type='phone' />电话：</li>
				                <li className="taxt_blue_color border_bottom">{ sellerInfo.tel }</li>
				                <li className="letter_spacing"><Icon type='eye-o'/>简介：</li>
				                <li className="taxt_blue_color">{ sellerInfo.signature }</li>
				            </ul> : 
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
    									<li onClick={() => this.handleSort("id")} className="inline_li"><Icon type={isUp?"up":"down"} />上架时间</li>
    									<li onClick={() => this.handleSort("collect")} className="inline_li"><Icon type={isUp?"up":"down"} />留言数</li>
    									<li onClick={() => this.handleSort("price")} className="inline_li"><Icon type={isUp?"up":"down"} />售价</li>
    								</ul>
    								<Pagination
    									current={current} 
    									hideOnSinglePage={true}
    									total={sellerBooks.length}
    									pageSize= {6}
    									size="small"
    									onChange={ (page,pageSize) => this.handleChange(page,pageSize)}
    								/>
    							</div> 

    							<SellerBooks className="white_bgColor" listData={this.props.sellerBooks} />

    							<Pagination
    								className="float_right"
    								hideOnSinglePage={true}
    								total={sellerBooks.length}
    								current={current}
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
			: <Loading loading={true} />
		)
	}
}
export default connect(mapStateToProps)(ProductShow);