import React from 'react';
import PropTypes from 'prop-types';

require('./user.scss')

const UserInfo = ({userInfo}) => {
	return (
		<div className="user_container overflow_hidden white_bgColor">
	        <div className="user_img">
	            <img className="user_profile" src="http://ubookmall.b0.upaiyun.com/user/2017/10/03/7564424992_1507024484.jpg!big" alt="墨香书阁" />
	        </div>
	        <div className="user_nav_info overflow_hidden">
	            <ul className="paddingNone">
	                <li>{ userInfo.userName }</li>
	                <li>{ userInfo.sex }</li>
	                <li>{ userInfo.school }</li>
	                <li>{ userInfo.city }</li>
	                <li>
	                	<a className="user_fan_faned_link" href="http://www.jiushujie.com/user/18034599/follow">
	                		{`关注(${userInfo.fan})`}
	                	</a>&nbsp;
	                	<a className="user_fan_faned_link" href="http://www.jiushujie.com/user/18034599/fan">
	                		{`粉丝(${userInfo.concern})`}
	                	</a>
	                </li>
	                
	            </ul>
	        </div>
		</div>
	)
}

UserInfo.propTypes = {
	userInfo: PropTypes.object.isRequired
}

export default UserInfo;