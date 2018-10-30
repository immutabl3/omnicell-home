const path = require('path');
const webpack = require('webpack');
const env = require('./env');

const dev = !env.production;
dev && require('dotenv').config();

module.exports = function scripts({ entry }) {
	return {
		entry,
		mode: dev ? 'development' : 'production',
		devtool: dev ? 'cheap-module-source-map' : 'source-map',
		watch: dev,
		output: {
			path: path.resolve(process.cwd(), 'public'),
			filename({ chunk }) {
				const { name } = chunk;
				return `${name}.js`.replace('js/', '');
			},
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				}
			]
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				...process.env,
				NODE_ENV: dev ? 'development' : 'production',
			})
		],
		resolve: {
			extensions: [
				'.js',
				'.jsx'
			] 
		}
	};
};