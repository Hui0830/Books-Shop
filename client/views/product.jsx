import React,{ Component } from 'react'

import ProductShow from './shop'
import AppBar from './layout/app-navBar'
import Footer from './layout/Footer'
import '../public/css/layout.css'

export default class ProductShowItem extends Component {
	render() {

		return (

			<div>
				<ProductShow />
			</div>

		)
	}
}