import React from 'react';
import Carousel from './Carousel';
import Slides from './Slides';
import Tabs from './Tabs';
import Blurs from './Blurs';

export default function ScrollTabs() {
	return (
		<>
			<Blurs />
			<Tabs />
			<Slides />
			<Carousel />
		</>
	);
};