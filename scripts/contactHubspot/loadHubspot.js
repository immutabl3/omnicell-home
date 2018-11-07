const POLL = 100;

export default path => {
	const script = document.createElement('script');
	script.setAttribute('src', path);
	document.body.appendChild(script);
	return new Promise(function(resolve) {
		const check = () => {
			if (!global.hbspt) return setTimeout(check, POLL);
			resolve(global.hbspt);
		};
		check();
	});
};