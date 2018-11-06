import React from 'react';
import Image from './Image';
import { branch } from 'baobab-react/higher-order';

const renderImage = ({ image }, idx) => (
	<Image
		key={ idx }
		index={ idx }
		image={ image }
	/>
);

const Carousel = function({ x, panels }) {
	return (
		<div
			className="scroll-tabs__carousel"
			style={ { transform: `translateX(${x}px) translateZ(1px)` } }
		>
			{ panels.map(renderImage) }
		</div>
	);
};

export default branch({
	x: 'x',
	panels: 'panels',
}, Carousel);