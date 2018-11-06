export default function({ x, width, index }) {
	const theX = index !== 0 && x > 0 ? 0 : Math.abs(x);
	const startX = index * width;
	const invertedPerc = (startX - theX) / width;
	const perc = 1 - invertedPerc;
	const thePerc = perc >= 2 ? 0 : 
		perc > 1 ? 1 - (perc - 1) :
			perc < 0 ? 0 :
				perc;
	return thePerc;
};