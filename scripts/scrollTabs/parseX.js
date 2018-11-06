export default function(elem, fn) {
	return () => {
		// 1. ensure a string
		// 2. substring the 'translateX('
		// 3. parseInt to drop )px
		const x = parseInt(`${elem.style.transform}`.substr(11), 10);
		fn(x);
	};
};