import React, { Component } from 'react';
import Tab from './Tab';
import { branch } from 'baobab-react/higher-order';
import TWEEN from '@tweenjs/tween.js';

class Tabs extends Component {
	constructor() {
		super();
		
		this.onRef = this.onRef.bind(this);
		this.renderTab = this.renderTab.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.panel !== prevProps.panel) this.scroll(this.props.panel);
	}

	onRef(container) {
		this.container = container;
	}

	scroll(idx) {
		const { container } = this;
		if (!container) return;
		
		if (this.animation) this.animation.stop();

		const child = container.children[idx];
		if (!child) return;

		const startingX = container.scrollLeft;
		const endingX = child.offsetLeft;

		this.animation = new TWEEN.Tween({ x: startingX })
			.to({ x: endingX }, 250)
			.onUpdate(({ x }) => (container.scrollLeft = x))
			.onComplete(() => (this.animation = undefined))
			.start();
	}

	renderTab({ title }, idx) {
		return (
			<Tab
				key={ idx }
				index={ idx }
				title={ title }
			/>
		);
	}

	render() {
		const { panels } = this.props;
		return (
			<div
				ref={ this.onRef }
				className="scroll-tabs__tabs"
				aria-hidden="true"
			>
				{ panels.map(this.renderTab) }
			</div>
		);
	}
};

export default branch({
	panel: 'panel',
	panels: 'panels',
	onSelect: 'onSelect',
}, Tabs);