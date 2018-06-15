
import React,{Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  const { myOrder } = state.userInfoData.userInfo;
  return {
    myOrder
  }
}

class ShoppingCart extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				{`${this.props.myOrder}`}
			</div>
		)
	}
}
export default connect(mapStateToProps)(ShoppingCart)