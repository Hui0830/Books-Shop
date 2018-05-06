import React from 'react';

const Counter = ({ value, caption, onIncrement, onDecrement }) => {

	return (
		<div>
			<button onClick = { onIncrement }>触发加法计算：+</button>
			<button onClick = { onDecrement }>触发减法法计算：-</button>
			<span>{caption} count: {value}</span>
		</div>
	)
}

export default Counter;