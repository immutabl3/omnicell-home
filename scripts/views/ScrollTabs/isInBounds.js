export default function({ x, width, index }) {
	const theX = index !== 0 && x > 0 ? 0 : Math.abs(x);
	const startX = index * width;
	const invertedPerc = (startX - theX) / width;
	const perc = 1 - invertedPerc;
	return perc < 2 && perc > 0;
};