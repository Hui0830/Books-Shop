import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar  } from 'antd';
import {Link} from 'react-router-dom';
 
 const CommentItem = ({data}) => {
 	return (
 		<div className="comment_container">
 			<h3>留言区：</h3>

 			{
 			data.length !== 0 ?
 			<List
		       className="demo-loadmore-list"
		       itemLayout="horizontal"
		       dataSource={data}
		       renderItem={item => (
		         <List.Item className="hover" actions={[<a>edit</a>, <a>more</a>]}>
		           <List.Item.Meta
		             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
		             title={<Link to={`/user/${item.userId}`}>{item.userName}</Link>}
		             description={`${item.content}Ant Design, a design language for background applications, is refined by Ant UED Team`}
		           />
		         </List.Item>
		       )}
		     /> : "暂时没有留言哦"
		 }
 		</div>
 	)
 }
 CommentItem.propTypes = {
 	data: PropTypes.array.isRequired
 }
 export default CommentItem