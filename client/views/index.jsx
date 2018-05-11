import React,{ Component } from 'react'
import { Carousel, Icon, Layout} from 'antd';

import Counter from './counter';
import MyCarousel from './components/carousel';
//import BooksList from './components/booksList/verticalList';
import InfiniteListExample from './components/infiniteScroller/infiniteScroller';
import MySearch from './home/search';
import Mysider from './home/sider';

import '../public/css/layout.css';
import './index.scss'



const data = [
	{
		header: '热门书籍',
		data: [
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'}
		]
	},
	{
		header: '热门个人',
		data: [
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'},
			{img: 'client/public/images/favicon.ico' ,content:'Racing car sprays burning fuel into crowd.'}
		]
	},

]
;
let listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
export default class App extends Component {

	conponentDidMount() {
		/*do some thing*/
	}

	render() {
		const { Header , Content ,Sider } = Layout;
		return (
			<div>
				<MyCarousel />
				<Layout className="content-layout">
			      <Header>
			      	<MySearch />
			      </Header>
			      <Layout>
			        <Sider width='300'>
			       		<Mysider.QQContact />
			        	<Mysider.HotBooks data = {data} />
			        </Sider>
			        <Content>
			        	<div className="contentHeader">
			        		<div className="title">
			        			<span>热门书籍</span>
			        		</div>
			        		<div className="more">
			        			<a >查看更多<Icon type="double-right" /></a>
			        		</div>
			        	</div>,
			        	<InfiniteListExample />
			        	{/*<Counter caption = "first" />
			        				        	<Counter caption = "second" />
			        				        	<Counter caption = "third" />
			        				        	测试
			        				        	<p>成功</p>*/}
			        </Content>
			      </Layout>
				</Layout>
				
			</div>
		)
	}
}