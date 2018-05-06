import React,{ Component } from 'react';

import propduct_1 from  "../../public/images/01.jpg";

require('./shop.pcss');

class ProductShow extends Component {


	constructor(props){
		super(props)

	}

	componentDidMount() {

	}


	componentWillReceiveProps(nextProps) {
		console.log(nextProps,"this.props",this.props)
	}
	shouldComponentUpdate(nextProps, nexState) {

		if (this.state === nexState && this.props === nextProps) {

			return false
		}
	}

	render() {
		return (
			<div className="propductContain">
				<div className="propductInfo">
					<ul>
						<li className="propductInfo_item">
							<label>产品名：</label><p>公主吊顶床幔</p>
						</li>
						<li className="propductInfo_item">
							<label>产品名：</label><p>公主吊顶床幔</p>
						</li>
						<li className="propductInfo_item">
							<label>产品名：</label><p>公主吊顶床幔</p>
						</li>
						<li className="propductInfo_item">
							<label>产品名：</label><p>公主吊顶床幔</p>
						</li>
						<li className="propductInfo_item">
							<label>产品名：</label><p>公主吊顶床幔</p>
						</li>
						<li className="propductInfo_item">
							<label>产品名：</label><p>公主吊顶床幔</p>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
export default ProductShow;