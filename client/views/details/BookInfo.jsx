import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Input } from 'antd';
import Comment from './comment';

require('./detail.scss');

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const BookInfo = ({bookInfo}) => {
	return (
		<div className="book_item overflow_hidden">
			{/*-------------书籍图片--------------*/}
		    <div className="book_pic overflow_hidden">
		        <img className="book_pic overflow_hidden" alt="假面前夜（全新未拆封硬精装）-买卖二手书,就上旧书街" title="假面前夜（全新未拆封硬精装）-买卖二手书,就上旧书街" src="http://ubookmall.b0.upaiyun.com/book/2018/04/17/7918248969_1523949760.jpg" />
		    </div>

			{/*-------------书籍基本信息--------------*/}
		    <div className="info overflow_hidden">
		        <h2>{ bookInfo.name }</h2>
		        <div className="detail border_bottom">
		        	<ul className="paddingNone">
		        		<li>{ bookInfo.author }</li>
		        		<li>{ bookInfo.id }</li>
		        		<li>
		        			{ `￥${bookInfo.price}` }
		        			<span className="line-through-price">{`￥${bookInfo.oldPrice}`}</span>
		        			{ `${bookInfo.oldPrice/bookInfo.price}折` }
		        		</li>
		        		<li>{ bookInfo.news  }</li>
		        		<li>{ `库存：${bookInfo.num}` }</li>
		        		<li>{ `类别：${bookInfo.category}` }</li>
		        	</ul>                                      
		        </div>
		    </div>
		   {/*-------------书籍简介--------------*/}
		    <div className="book_introduction_container border_bottom">
		    	{ bookInfo.describe }
		    </div> 
			{/*-------------书籍加入购物车--------------*/}
		    <div className="book_view_action_container overflow_hidden">
		        <div style={{float:'left',width:'134px'}}>
		           { /*<!-- Baidu Button BEGIN -->*/}
		            <div id="bdshare" className="bdshare_b" style={{lineHeight: "12px"}}>
		            	<img src="http://bdimg.share.baidu.com/static/images/type-button-1.jpg" />
		            </div>
		            <script type="text/javascript" id="bdshare_js" data="type=button" src="http://bdimg.share.baidu.com/static/js/bds_s_v2.js?cdnversion=423941"></script>
		            
		            <script type="text/javascript">
		                document.getElementById("bdshell_js").src = "http://bdimg.share.baidu.com/static/js/shell_v2.js?cdnversion=" + new Date().getHours();
		            </script>
		           { /*<!-- Baidu Button END -->*/}
		        </div>
		        <div >
		        	<ul className="buy_container paddingNone algin_right overflow_hidden">
		        		<li><IconText type="star-o" text="156" /></li>
		        		<li><IconText type="like-o" text="156" /></li>
		        		<li><IconText type="message" text="2" /></li>
		        		<li>
		        			<Button href="/sell/create/id/89942385" type="primary" icon="shopping-cart">购&nbsp;&nbsp;买</Button>
		        		</li>
		        	</ul>
		        </div>
		    </div>

		    {/*-------------书籍发表评论--------------*/} 
		    <div className="comment_container border_bottom">
		    	<h3>我要留言（限255字）:</h3>
		    	<Input.TextArea   
		    		maxLength={255} 
		    		autosize={{minRows: 6, maxRows: 12}} 
		    		placeholder ="请发表对此书的评论" 
		    	/>
		    	<div className="algin_right comment_submit ">
		    		<Button href="/sell/create/id/89942385" type="primary" icon="shopping-cart">购&nbsp;&nbsp;买</Button>
		    	</div>
		    </div>
	    	{/*------------评论区------------------*/}   
	    	<Comment data={bookInfo.comment} />
		</div>
	)
}

BookInfo.propTypes = {
	bookInfo: PropTypes.object.isRequired
}

export default BookInfo;