import React, { Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import { branch } from 'baobab-react/higher-order';
import calculateDeviation from './calculateDeviation';
import { BLUR_MAX } from './config.json';
import isInBounds from './isInBounds';

// safari, firefox and ie all hate the blurs
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
const isChrome = !!global.chrome && !!global.chrome.webstore;

const calcBlurAmount = perc => Math.round((1 - perc) * BLUR_MAX);

class Image extends Component {
	constructor() {
		super();

		this.id = `blur${uniqueId()}`;
	}
	
	render() {
		const { image } = this.props;
		const visible = isInBounds(this.props);
		const perc = calculateDeviation(this.props);
		const blur = calcBlurAmount(perc);
		const shouldBlur = isChrome && visible && blur !== 0;

		return (
			<div
				className="scroll-tabs__carousel__image"
				style={ {
					backgroundImage: `url(${image})`,
					filter: shouldBlur ? `url(#blur${blur})` : '',
				} }
			/>
		);
	}
};

export default branch({
	x: 'x',
	width: 'width',
}, Image);