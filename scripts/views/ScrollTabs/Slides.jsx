import React, { PureComponent } from 'react';
import range from 'lodash/range';
import { branch } from 'baobab-react/higher-order';

class Slides extends PureComponent {
	constructor({ qty }) {
		super();
		
		this.list = range(qty);
		this.onRef = this.onRef.bind(this);
		this.renderSlide = this.renderSlide.bind(this);
	}

	componentDidUpdate() {
		this.frame && this.props.onFrameReady && this.props.onFrameReady(this.frame);
	}

	onRef(elem) {
		this.frame = elem;
	}

	renderSlide(_, idx) {
		return <li key={ idx } className="scroll-tabs__slide" />;
	}

	render() {
		return (
			<div ref={ this.onRef }>
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
	onFrameReady: 'onFrameReady',
}, Slides);