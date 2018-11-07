import React from 'react';
import Spinner from '../Components/Spinner';
import Poster from './Poster';
import Videos from './Videos';
import { branch } from 'baobab-react/higher-order';

const Banner = function({ loading }) {
	if (loading) return <Spinner />;
	
	return (
		<>
			<Poster />
			<Videos />
		</>
	);
};

export default branch({
	loading: 'loading',
}, Banner);