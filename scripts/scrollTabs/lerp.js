const precision = 0.001;
export default function(x, to, perc = 0.1) {
	const minTo = to - precision;
	const maxTo = to + precision;
	if (x > minTo && x < maxTo) {
		if (x !== to) return x;
		return;
	}

	const positive = x > to;
	const distance = positive ? 
		x - to :
		to - x;
	const step = distance * perc;
	const newX = positive ? 
		to + step :
		to - step;
	return newX;
};