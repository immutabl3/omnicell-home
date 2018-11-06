import React from 'react';
import Tab from './Tab';
import { branch } from 'baobab-react/higher-order';

const renderTab = ({ title }, idx) => {
	return (
		<Tab
			key={ idx }
			index={ idx }
			title={ title }
		/>
	);
};

// TODO: optimize
const Tabs = function({ panels }) {
	return (
		<div className="scroll-tabs__tabs" aria-hidden="true">
			{ panels.map(renderTab) }
		</div>
	);
};

export default branch({
	panels: 'panels',
	onSelect: 'onSelect',
}, Tabs);