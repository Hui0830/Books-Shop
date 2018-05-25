import React from 'react';
import { Card, Icon } from 'antd';
import {Link} from 'react-router-dom'

/*-------item底部Icon组件---------*/
const IconText = ({ type, text, title }) => (
  <span title={title}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
/*-------卡片描述价格组件-------*/
const Price = ({price, oldPrice}) => {
	return (
		<p className="priceContainer">
			{ `￥ ${price}` }
			<del className="delPrice">
				{ `￥ ${oldPrice}` }
			</del>
		</p>
	)
}

const BookItem = ({bookInfo}) => {
	return (
		<Card
		    style={{margin:'10px'}}
		    hoverable={true}
		    cover={
		    	<img title={bookInfo.name} alt={bookInfo.name} className="book_pic" src={bookInfo.img} />
		    }
		    actions={
		    	[
		    		<IconText title="收藏数" type="star-o" text={bookInfo.collect} />,
		    		<IconText title="留言数" type="message" text={bookInfo.cart} />
		    	]
		    }
		  >
		    <Card.Meta
		      title={<Link to={`/detail/${bookInfo.id}`}>{bookInfo.name}</Link>}
		      description={<Price price= {bookInfo.price} oldPrice={bookInfo.oldPrice} />}
		    />
		  </Card>
	)
}
export default BookItem