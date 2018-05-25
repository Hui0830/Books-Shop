import React,{Component} from 'react';
import { List, Button, Input } from 'antd'

const data = [
  {
    title: '个性签名：',
    content: '是个撒大口径航空还开会开会21好看好(•_•)?21uhkjhukhu1h2kjhku2212hhk2客家话客户客户快结婚客家话客户客户2客家话'
  },
];
export default class Intro extends Component {
	constructor(props) {
		super(props)

		this.state = {
			inputShow: true,
			content: data[0].content
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
			    dataSource={data}
			    
			    renderItem={item => (
			      <List.Item actions={[<Button onClick={this.handleClick} type="primary" icon="form">编 辑</Button>]}>
			        <List.Item.Meta
			          title={<a href="https://ant.design">{item.title}</a>}
			          description={this.state.content}
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
			  		value={this.state.content}
			  		onChange={this.handleChange}
			  	/>
			  	<div className="algin_right">
			  		<Button style={{margin:'20px'}} onClick={this.handleSave} type="primary" icon="shopping-cart">保&nbsp;&nbsp;存</Button>
			  	</div>
			  </div>
		
		)
	}
}