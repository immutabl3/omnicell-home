import React, { Component } from 'react';
import Video from './Video';
import { branch } from 'baobab-react/higher-order';

class Videos extends Component {
	constructor() {
		super();

		this.renderVideo = this.renderVideo.bind(this);
	}

	renderVideo(source) {
		return <Video key={ source } source={ source } />;
	}

	render() {
		return this.props.loops.map(this.renderVideo);
	}
}

export default branch({
	loops: 'loops',
}, Videos);