import React from 'react';
import { branch } from 'baobab-react/higher-order';

const Poster = function({ poster }) {
	return (
		<div
			className="banner__poster"
			style={ { backgroundImage: `url(${poster})` } }
		/>
	);
};

export default branch({
	poster: 'poster',
}, Poster);