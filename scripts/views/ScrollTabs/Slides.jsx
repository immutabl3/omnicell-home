import React, { PureComponent } from 'react';
import range from 'lodash/range';
import { branch } from 'baobab-react/higher-order';

class Slides extends PureComponent {
	constructor({ qty }) {
		super();
		
		this.list = range(qty);
		this.renderSlide = this.renderSlide.bind(this);
	}

	renderSlide(_, idx) {
		return <li key={ idx } className="scroll-tabs__slide" />;
	}

	render() {
		return (
			<div data-frame ref={ this.onRef }>
				<div className="scroll-tabs__frame">
					<div className="scroll-tabs__slides">
						{ this.list.map(this.renderSlide) }
					</div>
				</div>
			</div>
		);
	}
};

export default branch({
	qty: 'qty',
}, Slides);