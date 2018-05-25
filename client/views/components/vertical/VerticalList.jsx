import React from 'react';
import PropTypes from 'prop-types';
import { List, message, Avatar, Spin,Icon,Button, Divider } from 'antd';
import {Link} from 'react-router-dom'

require('./verticalList.scss')
/*-------item底部Icon组件---------*/
const IconText = ({ type, text }) => (
  <span className = {type === "pay-circle-o" ? "pirce" : ''}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const BookUser = ({item}) => {
	return [
		<Avatar title={item.seller.userName} shape="square" src={item.seller.img}  key="user_avatar"/>,
		<Divider type="vertical" />,
		<Link to={`/user/${item.sellId}`}>{item.seller.userName}</Link>,
		<Divider type="vertical" />,
		<Icon className={item.seller.sex === "男" ? "man" : "woman"} type={item.seller.sex === "男" ? "man" : "woman"} />,
		<Divider type="vertical" />,
		<span>{item.seller.school}</span>
	]
};
/*-----------渲染Item组件--------------*/
const RenderItem = ({item}) => {
  return (
    <List.Item
    	className="hover"
        key={item.id}
        extra={<img title={item.name} alt={item.name} className="book_pic" src={item.img} />}
        actions={
          [
            <IconText type="star-o" text={item.collect} />, 
            <IconText type="message" text={item.comment.length} />,
            <IconText type="pay-circle-o" text={item.price} />,
            <IconText type="pay-circle" text={<del>{item.oldPrice}</del>} />
          ]
        }
      >
        <List.Item.Meta
          title={<Link to={`/detail/${item.id}`} >{item.name}</Link>}
          description={<BookUser item={item} />}
        />	
        	
        	<ul className="book_info_list">
        		<li>{item.author}</li>
        		<li>{item.news}</li>
        		<li>{`类别：${item.category}`}</li>
        		<li>{ `库存：${item.num}` }</li>
        	</ul>
        	<Button type="primary" icon="shopping-cart" className="buy_btn">立即购买</Button>
      </List.Item>
  )
  
}
export default class InfiniterItem extends React.Component {
	
	constructor(props) {
		super(props)

	}

	render() {
		const {listData} = this.props;
		return (
			<List
			  key="goodBooks"
			    itemLayout="vertical"
			    size="large"
			    dataSource={listData}
			    
			    renderItem={(item) => (
			      <RenderItem item={item} />
			    )}
			  >
			  {/*this.state.loading && this.state.hasMore && (
			    <div className="demo-loading-container">
			      <Spin />
			    </div>
			  )*/}
			</List>
		)
	}

}
InfiniterItem.propTypes = {
	listData: PropTypes.array,
}