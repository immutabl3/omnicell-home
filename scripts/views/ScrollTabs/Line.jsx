import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import calculateDeviation from './calculateDeviation';
import { POINT_OFFSET } from './config.json';

const calcPointOffset = perc => (1 - perc) * POINT_OFFSET;

class Line extends Component {
	constructor() {
		super();

		this.lineToPoints = this.lineToPoints.bind(this);
	}

	lineToPoints(points, panelIndex) {
		const { dragging, width, height } = this.props;
		
		// how far to offset the x coords because we're pulling
		// the svg wide
		const offsetWidth = width / 4;

		// this math simulates stretching the line when we drag by
		// shortening the y points toward the center
		const yOffsetDistance = dragging ? 
			calcPointOffset(calculateDeviation(this.props)) : 
			0;

		return points.map(([x, y]) => {
			const offsetX = width * panelIndex;
			const pxX = (width * x) + offsetX + offsetWidth;
			const initialY = height * y;
			const distance = y > 0.5 ? yOffsetDistance * -1 : yOffsetDistance;
			const pxY = initialY + distance;
			return `${pxX},${pxY}`;
		}).join(' ');
	}

	render() {
		const { x, width, height, line } = this.props;
		// make the svg bigger than the view	
		const masterWidth = width * (line.length + 1);
		// and pull it left a little
		const positionX = x - (width / 4);
		// create the points
		const points = line.map(this.lineToPoints).join(' ');
		// adding an extra start point and end point along
		// with the offset makes it appear that our line is
		// seemless
		const startPoint = [0, height / 2].join(',');
		const endPoint = [masterWidth, height / 2].join(',');

		return (
			<svg
				className="scroll-tabs__line"
				viewBox={ `0 0 ${masterWidth} ${height}` }
				style={ { transform: `translateX(${positionX}px) translateZ(1px)` } }
			>
				<polyline points={ `${startPoint} ${points} ${endPoint}` } />
			</svg>
		);
	}
};

export default branch({
	x: 'lineX',
	index: 'panel',
	width: 'width',
	height: 'height',
	dragging: 'dragging',
	line: 'line',
}, Line);