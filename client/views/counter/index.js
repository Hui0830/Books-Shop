import React,{ Component } from 'react';

import store from '../../store/Store';
import * as Actions from '../../action/Action';
import Counter from './Counter';

export default class CounterComponent extends Component {
	constructor(props) {
		super(props)

		this.state = this.getOwnState();

		this.onIncrement = this.onIncrement.bind(this);
		this.onDecrement = this.onDecrement.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	/*挂载时通过store监听保持this.state和store状态同步*/
	componentDidMount() {
		store.subscribe(this.onChange);
	}

	componentWillUnmount() {
		/*组件卸载时需要注销store监听事件*/
		store.unsubscribe(this.onChange);
	}

	/*获取store中部分数据用于初始化state*/
	getOwnState() {
		return {
			value: store.getState()[this.props.caption]
		};
	}
	/*store变化触发监听函数*/
	onChange() {
		this.setState(
			this.getOwnState()
		)
	}

	/*触发加事件，派发increment*/
	onIncrement() {
		store.dispatch (Actions.increment(this.props.caption));
	}
	/*触发减事件，派发decrement*/
	onDecrement() {
		store.dispatch (Actions.decrement(this.props.caption));
	}

	render() {
		const { value } = this.state;
		const { caption } = this.props;

		const childProps = {
			value,
			caption,
			onIncrement: this.onIncrement,
			onDecrement: this.onDecrement
		}

		return (
			<Counter {...childProps} />
		)
	}

}