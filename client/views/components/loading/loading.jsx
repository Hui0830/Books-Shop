import {
	Spin,
	Modal
} from 'antd'
import PropTypes from 'prop-types';
import React from 'react';

require('./loading.scss');

const Loading = ({loading}) => {
	return (
		<Modal 
			closable = {false}
			destroyOnClose = {true}
			footer = {null}
			maskClosable = {false}
			visible = {loading}
			keyboard = {false}
			wrapClassName="vertical-center-modal"
		>
			<Spin size="large" tip="Loading..." />
		</Modal>
	)
}

Loading.propTypes = {
	loading: PropTypes.bool.isRequired
}
export default Loading