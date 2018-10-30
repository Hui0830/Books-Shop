import React,{ Component } from 'react';
import {Layout, Pagination} from 'antd';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';


import SiderList from '../components/siderList';
import Books from '../components/vertical/VerticalList';
import MySearch from '../home/search';



require('./shop.scss');


function mapStateToProps(state,ownProps) {
	const { goodsilderBooks, goodPerson } = state.asyncReducer;
	const { status, books } = state.productData;
	return {
		status,
		data:[goodsilderBooks,goodPerson],
		books,

	}
}

/*-------书籍分类组件-------*/
const bookType = ["文学艺术","人文社科","经济管理","生活休闲","外语学习","自然科学","考试教育","计算机","医学"];


const BookType = ({handleSearch, content}) => {
	return (
		<div>
			<h3 className="header">书籍分类</h3>
			<ul className="booktype_sidebar_div">
			{
				content.map(item => (
					<li onClick={(item) => handleSearch(item)} className="booktype_item">{item}</li>
				))
			    
			}
			</ul>
		</div>
	)
}

const HotBookSider = ({data}) => {
	return (
		<div>
			<SiderList data={data} />
		</div>
	)
}

class ProductShow extends Component {
	/*static contextTypes = {
		store: PropTypes.object
	}*/
	constructor(){
		super(...arguments)
		this.state = {
			books: this.props.books,
			data: this.props.data,
			listData: this.props.books.slice(0,10),
			isUp: false,
			pageSize: 6,
			total: this.props.books.length,
			current: 1
		}

		this.handleSearch = this.handleSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSort = this.handleSort.bind(this)

	}
	/*-----书籍分类检索事件----*/
	handleSearch(item) {
		console.log(`/product/?q=${item}`)
	}
	/*-------排序事件---------*/
	handleSort(type) {
		let {isUp, books} = this.state;
		books.sort((next, prev) => {
			if(isUp) {
				return prev[type]-next[type]
			}else {
				return next[type]-prev[type]
			}
			
		})
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

	render() {
		const {Content, Sider} = Layout;
		const { current,listData,data,books } = this.state;
		return (
			<Layout>
				
				<Sider width={300} className="white_bgColor">
					<div className="siderContainer" key={`slider`}>
						<BookType handleSearch={this.handleSearch} content={bookType} />
						<HotBookSider data={data} />
					</div>

				</Sider>
				<Content className="gray_bgColor margin_left">

					<div className="book_search white_bgColor">
						<MySearch />
					</div>

					<div className="books_container white_bgColor padding_all  margin_top overflow_hidden">
						<div className="sorter border_bottom">
							<ul>
								<li  className="inline_li">排序: </li>
								<li onClick={() => this.handleSort("id")} className="inline_li">上架时间</li>
								<li onClick={() => this.handleSort("collect")} className="inline_li"><a href="">留言数</a></li>
								<li onClick={() => this.handleSort("price")} className="inline_li"><a href="">售价</a></li>
							</ul>
							<Pagination
								current={current} 
								hideOnSinglePage={true}
								total={books.length}
								pageSize= {6}
								onChange={ (page,pageSize) => this.handleChange(page,pageSize)}
							/>
						</div>

						<Books className="white_bgColor" listData={listData} />
						<Pagination
							className="float_right"
							hideOnSinglePage={true}
							total={books.length}
							current={current}
							pageSize= {6}
							onChange={ (page,pageSize) => this.handleChange(page,pageSize)}
						/>

					</div>
				</Content>
			</Layout>
		)
	}
}
export default connect(mapStateToProps)(ProductShow);