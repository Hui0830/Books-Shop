import {
	Spin,
	Modal
} from 'antd'
import PropTypes from 'prop-types';
import React from 'react';

require('./myModal.scss');

const MyModal = ({loading}) => {
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

MyModal.propTypes = {
	loading: PropTypes.bool.isRequired
}
export default MyModal