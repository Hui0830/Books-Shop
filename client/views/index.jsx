import React,{ Component } from 'react'
import { Carousel } from 'antd';

import AppBar from './layout/app-navBar'
import Counter from './counter'
import Footer from './layout/Footer'

import '../public/css/layout.css'

export default class App extends Component {

	conponentDidMount() {
		/*do some thing*/
	}

	render() {
		const settings = {
		     dots: true,
		     infinite: true,
		     speed: 500,
		     slidesToShow: 1,
		     slidesToScroll: 1,
		     autoplay:true
		   };
		let test = 1;
		return (
			<div>
				<Carousel {...settings} >
				    <div><h3>1</h3></div>
				    <div><h3>2</h3></div>
				    <div><h3>3</h3></div>
				    <div><h3>4</h3></div>
				 </Carousel>
				<Counter caption = "first" />
				<Counter caption = "second" />
				<Counter caption = "third" />
				测试
				<p>成功</p>
			</div>
		)
	}
}