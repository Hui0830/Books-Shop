import React ,{ Component } from 'react'

import './appBar.pcss'


const navList = [
	{content: '首页', url: '/home', id: '1'},
	{content: '详情页', url: '/detail', id: '2'},
	{content: '更多', url: '/more', id: '3'},
	{content: '登入', url: '/login', id: '4'},
	{content: '注册', url: '/out', id: '5'},
];
/*const styles = {
	appBar: {
		display: 'flex',
		justifyContent: 'spaceAround',
		background: 'rgb(54, 62, 55)',
		textAlign: 'center',
		boxShadow: 'rgb(29, 39, 39) 0px 2px 5px',
		padding: '0',
		margin: '0'
	},
	navItem: {
		listStyle: 'none',
		width: '20%',
		lineHeight: '3.3em',
		height: '3.3em',
		letterSpacing: '10px',
		color: 'rgb(226, 105, 17)',
		cursor: 'pointer',
		boxShadow: '2px 0 0px -1px #5d606f'

	}
}*/
class NarBar extends Component {

	render() {
		return (
			<div>
				<ul className='appBar'>
					{
						navList.map((item,index) => (
							<li key = { item.id } className = ' navItem '>{ item.content }</li>
						))
					}
				</ul>
			</div>
		)
	}
}

export default NarBar;