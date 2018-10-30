const scripts = require('./build/scripts');

module.exports = scripts({
	entry: {
		'js/site': './scripts/index.js',
	},
});