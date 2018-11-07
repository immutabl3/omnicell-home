const qs = function(selector, container = document) {
	return selector[0] === '#' ? 
		container.querySelector(selector) : 
		Array.from(container.querySelectorAll(selector));
};

qs.attr = (element, key, value) => {
	if (value === undefined) return element.getAttribute(key);
	return element.setAttribute(key, value);
};

export default qs;