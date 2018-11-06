import range from 'lodash/range';
import random from 'lodash/random';

const lowY = 0.9;
const highY = 0.1;

const varianceXmin = 0;
const varianceXmax = 0.05;

const varianceYmin = 0;
const varianceYmax = 0.05;

const generateQtyOfMarks = () => random(3, 4);
const fiftyFifty = () => !!random(0, 1);

const generateX = (numOfMarks, pointPosition) => {
	const spacingX = 1 / numOfMarks;
	const positionX = spacingX * pointPosition;

	const shouldVariate = fiftyFifty() ? 1 : 0;
	const variateDirection = fiftyFifty() ? 1 : -1;
	const variateAmount = random(varianceXmin, varianceXmax);
	const variance = shouldVariate * variateDirection * variateAmount;
	
	return positionX + variance;
};

const generateY = isLow => {
	const shouldVariate = fiftyFifty() ? 1 : 0;
	const variateDirection = fiftyFifty() ? 1 : -1;
	const variateAmount = random(varianceYmin, varianceYmax);
	const variance = shouldVariate * variateDirection * variateAmount;
	const startingPoint = isLow ? lowY : highY;
	
	return startingPoint + variance;
};

export default function(numOfPanels) {
	let isLow = true;
	const lastIdx = numOfPanels - 1;
	return range(numOfPanels)
		.map(panelIndex => {
			const points = [];
			const numOfMarks = panelIndex === 0 ? 4 : generateQtyOfMarks();
			
			// first point in the first panel
			if (panelIndex === 0) {
				points.push([0, generateY(isLow)]);
				// flip
				isLow = !isLow;
			}

			range(numOfMarks)
				.forEach(idx => {
					points.push([
						generateX(numOfMarks + 1, idx + 1),
						generateY(isLow)
					]);
					// flip
					isLow = !isLow;
				});

			// last point in the last panel
			if (panelIndex === lastIdx) {
				points.push([1, generateY(isLow)]);
			}		

			return points;
		});
};
	