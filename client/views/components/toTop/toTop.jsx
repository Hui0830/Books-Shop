import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Icon } from 'antd';

require('./toTop.scss')

const ToTop = ({toId}) => {
	return (
		<Anchor 
			className="to_top"
			showInkInFixed={false}
			bounds={1000}
			offsetTop={600}
		>
		<Anchor.Link
		  title = {<Icon type="to-top" />}
		  href = {toId} 
		/>
		</Anchor>
	)
}

ToTop.propTypes = {
	toId: PropTypes.string.isRequired
}
export default ToTop