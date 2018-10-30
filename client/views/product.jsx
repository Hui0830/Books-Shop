import {connect } from 'react-redux';
import React,{ Component } from 'react'
import PropTypes from 'prop-types';

import { getPageData } from '../action/Action.js';

import ProductShow from './shop'
import Loading from 'components/loading/loading'
import '../public/css/layout.scss'

const mapStateToProps = (state,OwnProp) => {
	const { status } = state.productData;
	return {
		status
	}
}

 class ProductShowItem extends Component {
 	static contextTypes = {
 		router: PropTypes.object,
 		store: PropTypes.object 
 	}
	componentDidMount() {
		const search = this.context.router.route.location.search;
		this.context.store.dispatch(getPageData("productPage",null,`/product${search}`));
	}
	render() {

		return (

			<div>
				{
					this.props.status === 'success' ?
					<ProductShow />
					: <Loading loading={true} />
				}
			</div>

		)
	}
}
export default connect(mapStateToProps)(ProductShowItem)