import React from 'react';
import { List, Avatar, Icon } from 'antd';
import PropTypes from 'prop-types';

import SiderList from '../../components/siderList';

require('./sider.scss')

const HotBooks = ({data}) => {
	return (
		<SiderList data = {data}/>
	)
}

HotBooks.propTypes = {
	data: PropTypes.array.isRequired
}
export default HotBooks;