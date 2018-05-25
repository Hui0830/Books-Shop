import React,{ Component } from 'react'
import { Carousel, Icon, Layout} from 'antd';
import {Link} from 'react-router-dom';

import Counter from './counter';
import MyCarousel from './components/carousel';
//import BooksList from './components/booksList/verticalList';
import InfiniteListExample from './components/infiniteScroller/infiniteScroller';
import VerticalList from './components/vertical/VerticalList' ;
import HomeBooksList from './components/booksList/verticalList';

import MySearch from './home/search';
import Mysider from './home/sider';
import store from '../store/Store';

import '../public/css/layout.scss';
import './index.scss';
import bookImg from '../public/images/logo.png';



const data = [store.getState().goodsilderBooks,store.getState().goodPerson];
const books = store.getState().bookInfo.books;

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			listData: books.slice(0,12),
			isVertical: true
		}

		this.getArray = this.getArray.bind(this);
	}

	conponentDidMount() {
		/*do some thing*/
		
	}
	getArray(i,j) {
		let {listData} = this.state
		this.setState({
			listData:listData.concat(books.slice(i,j))
		})
	}
	render() {
		const { Header , Content ,Sider } = Layout;
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
				        	<HomeBooksList listData={this.state.listData} />
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
				        	<VerticalList  listData={this.state.listData} />
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