import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Icon, Layout} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import Counter from './counter';
import MyCarousel from './components/carousel';
//import BooksList from './components/booksList/verticalList';
import InfiniteListExample from './components/infiniteScroller/infiniteScroller';
import VerticalList from './components/vertical/VerticalList' ;
import HomeBooksList from './components/booksList/verticalList';

import MySearch from './home/search';
import Mysider from './home/sider';

import '../public/css/layout.scss';
import './index.scss';
import bookImg from '../public/images/logo.png';

import { getPageData } from '../action/Action.js';

const mapStateToProps = (state,ownProp) => {
  console.log(state,ownProp)
  const { asyncReducer } = state;
  return {
    ...asyncReducer
  }
}
const mapDispatchToProps = (dispatch) => {
	return {
		onGetData: (datas,page) => {
			dispatch(getPageData(datas,page));
			console.log(dispatch(getPageData(datas,page)))
		}
	}
}

// const books = store.getState().bookInfo.books;

class App extends Component {
	static contextTypes = {
		store: PropTypes.object,

	}
	constructor() {
		super(...arguments)

		/*this.state = {
			data:[
			this.props.goodsilderBooks,
			this.props.goodPerson,
			],
			listData: this.props.books.slice(0,12),
			isVertical: true
		}*/

		this.getArray = this.getArray.bind(this);
	}

	componentDidMount() {
		/*do some thing*/
		console.log(this.context.store.getState());
		this.props.onGetData(null,'/index');
		
	}
	getArray(i,j) {
		let {listData} = this.state
		this.setState({
			listData:listData.concat(this.props.books.slice(i,j))
		})
	}
	render() {
		const { Header , Content ,Sider } = Layout;
		const data = [
			this.props.goodsilderBooks,
			this.props.goodPerson,
		];
		const listData = this.props.books.slice(0,12);
		return (
			<div>
				<MyCarousel />
				<Layout className="content-layout">
			      <Header className="white_bgColor">
			      	<MySearch />
			      </Header>
			      <Layout>
			        <Sider width='300'>
			       		<Mysider.QQContact />
			        	<Mysider.HotBooks data = {data} />
			        </Sider>
			        <Content>
			        	<div>
				        	<div className="contentHeader">
				        		<div className="title">
				        			<span>热门书籍</span>
				        		</div>
				        		<div className="more">
				        			<Link to={`/product?search=hotBooks`} >查看更多<Icon type="double-right" /></Link>
				        		</div>
				        	</div>
				        	<HomeBooksList listData={listData} />
			        	</div>
			        	<div>
				        	<div className="contentHeader">
				        		<div className="title">
				        			<span>最新书籍</span>
				        		</div>
				        		<div className="more">
				        			<Link to={`/product?search=newBooks`} >查看更多<Icon type="double-right" /></Link>
				        		</div>
				        	</div>
				        	<VerticalList  listData={listData} />
			        	</div>


			        	{/*<InfiniteListExample getArray={this.getArray} listData={this.state.listData}>
			        				        		{
			        				        			this.state.isVertical ? <InfiniteItem /> : <HomeBooksList />
			        				        		}
			        				        	</InfiniteListExample>*/}
			        </Content>
			      </Layout>
				</Layout>
				
			</div>
		)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(App)