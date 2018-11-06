import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import { branch } from 'baobab-react/higher-order';
import calculateDeviation from './calculateDeviation';
import { BLUR_MAX } from './config.json';

const calcBlurAmount = perc => Math.round((1 - perc) * BLUR_MAX);

class Image extends Component {
	constructor() {
		super();

		this.id = `blur${uniqueId()}`;
	}
	
	render() {
		const { image } = this.props;
		const perc = calculateDeviation(this.props);
		const blur = calcBlurAmount(perc);
		
		return (
			<div
				className="scroll-tabs__carousel__image"
				style={ {
					backgroundImage: `url(${image})`,
					filter: `url(#blur${blur})`,
				} }
			/>
		);
	}
};

export default branch({
	x: 'x',
	width: 'width',
}, Image);