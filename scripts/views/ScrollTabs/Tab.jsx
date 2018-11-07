import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Highlight from './Highlight';
import { branch } from 'baobab-react/higher-order';

class Tab extends PureComponent {
	constructor() {
		super();

		this.onSelect = this.onSelect.bind(this);
	}
	
	onSelect() {
		this.props.onSelect(this.props.index);
	}

	render() {
		const { title, index, panel } = this.props;
		return (
			<button
				role="button"
				onClick={ this.onSelect }
				className={ classnames('scroll-tabs__tab', {
					'scroll-tabs__tab--active': index === panel,
				}) }
			>
				<Highlight index={ index } />
				<span>
					{ title }
				</span>
			</button>
		);
	}
}

export default branch({
	panel: 'panel',
	onSelect: 'onSelect',
}, Tab);