import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel, Icon, Layout} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import MyCarousel from './components/carousel';
//import BooksList from './components/booksList/verticalList';
import InfiniteListExample from './components/infiniteScroller/infiniteScroller';
import VerticalList from './components/vertical/VerticalList' ;
import HomeBooksList from './components/booksList/verticalList';

import MySearch from './home/search';
import Mysider from './home/sider';

require('../public/css/layout.scss') ;
require('./index.scss');
import bookImg from '../public/images/logo.png';

import { getPageData } from '../action/Action.js';

const mapStateToProps = (state,ownProp) => {
  console.log(state,ownProp)
  const { asyncReducer,loginInOutReducer } = state;
  return {
  	...loginInOutReducer,
    ...asyncReducer
  }
}
const mapDispatchToProps = (dispatch) => {
	return {
		onGetData: (datas,page) => {
			dispatch(getPageData('homePage', datas,page));
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

		// this.getArray = this.getArray.bind(this);
	}

	componentDidMount() {
		/*do some thing*/
		this.props.onGetData(null,'/product/book/list');
		
	}
	// getArray(i,j) {
	// 	let {listData} = this.state
	// 	this.setState({
	// 		listData:listData.concat(this.props.books.slice(i,j))
	// 	})
	// }
	render() {
		const { Header , Content ,Sider } = Layout;
		const { newBooks,goodsilderBooks,goodPerson } = this.props;
		const hotBooks = this.props.data
		const data = [
			goodsilderBooks,
			goodPerson,
		];
		
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
				        	<HomeBooksList listData={hotBooks} />
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
				        	<VerticalList  listData={newBooks} />
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