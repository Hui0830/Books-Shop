import React,{Component} from 'react';

import {Icon, Carousel} from 'antd';

require('./carousel.scss');

export default class MyCarousel extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const settings = {
		     dots: true,
		     infinite: true,
		     speed: 1000,
		     slidesToShow: 1,
		     slidesToScroll: 1,
		     autoplay:true,
		     arrows:true,
		   };
		return (
			<div className="Carousel">
				<div className="prev">
					<Icon type="left" />
				</div>
				<Carousel {...settings} >
				    <div><h3 className="banner_01">1</h3></div>
				    <div><h3 className="banner_02">2</h3></div>
				    <div><h3 className="banner_03">3</h3></div>
				    <div><h3 className="banner_04">4</h3></div>
				 </Carousel>
				 <div className="next">
					<Icon type="right" />
				</div>
			</div>
		)
	}
}