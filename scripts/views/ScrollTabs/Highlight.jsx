import React from 'react';
import { branch } from 'baobab-react/higher-order';
import calculateDeviation from './calculateDeviation';

const Highlight = function(props) {
	const perc = calculateDeviation(props);
	return (
		<div
			className="scroll-tabs__tab__highlight"
			style={ { transform: `scaleX(${perc})` } }
		/>
	);
};

export default branch({
	x: 'x',
	width: 'width',
}, Highlight);