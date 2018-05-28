import React,{Component} from 'react';
import { List, Button, Input } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

// const data = [
//   {
//     title: '个性签名：',
//     content: '是个撒大口径航空还开会开会21好看好(•_•)?21uhkjhukhu1h2kjhku2212hhk2客家话客户客户快结婚客家话客户客户2客家话'
//   },
// ];
const mapStateToProps = (state,ownProps) => {
	const { loginReducer } = state;
	return {
		...loginReducer
	}
}

class Intro extends Component {
	constructor() {
		super(...arguments)

		this.state = {
			inputShow: true,
			content: [this.props.userInfo]
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	handleClick() {
		this.setState({
			inputShow:false
		})
	}
	handleSave() {
		const {content} = this.state;
		this.setState({
			inputShow:true,
		})
	}
	handleChange(e) {
		this.setState({
			content: e.target.value
		})
	}

	render() {
		return (
		
			this.state.inputShow?
			<List
			    itemLayout="horizontal"
			    dataSource={this.state.content}
			    
			    renderItem={item => (
			      <List.Item actions={[<Button onClick={this.handleClick} type="primary" icon="form">编 辑</Button>]}>
			        <List.Item.Meta
			          title='个性签名：'
			          description={item.signature}
			        />
			      </List.Item>
			    )}
			  /> :
			  <div className="border_bottom">
			  	<h3>个性签名（限255字）:</h3>
			  	<Input.TextArea   
			  		maxLength={255} 
			  		autosize={{minRows: 6, maxRows: 12}} 
			  		placeholder ="个性签名，让他人更加了解你！" 
			  		value={this.state.content[0].signature}
			  		onChange={this.handleChange}
			  	/>
			  	<div className="algin_right">
			  		<Button style={{margin:'20px'}} onClick={this.handleSave} type="primary" icon="shopping-cart">保&nbsp;&nbsp;存</Button>
			  	</div>
			  </div>
		
		)
	}
}

export default connect(mapStateToProps)(Intro)