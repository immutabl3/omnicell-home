import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import classnames from 'classnames';
import noop from 'lodash/noop';

class Video extends Component {
	constructor() {
		super();

		this.onRef = this.onRef.bind(this);
		this.onEnded = this.onEnded.bind(this);
	}

	componentDidMount() {
		const { activeSource, source } = this.props;
		if (activeSource !== source) return;
		if (!this.video) return;
		this.video.play();
	}

	componentDidUpdate(prevProps) {
		const { source } = this.props;
		if (prevProps.activeSource === source) return this.reload;
		const { video } = this;
		if (!video) return;
		// https://stackoverflow.com/questions/5235145/changing-source-on-html5-video-tag
		// Promise try catching is here because of the following errors:
		// they don't appear to affect anything and we don't have the time to handle the state more specifically to avoid the throws
		// Video.jsx:25 Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
		// Uncaught (in promise) DOMException: The play() request was interrupted by a call to pause().
		Promise.resolve()
			.then(() => this.video.load())
			.then(() => this.video.play())
			.catch(noop);
	}

	onRef(video) {
		this.video = video;
		
		// https://github.com/facebook/react/issues/6544
		video && video.setAttribute('muted', true);
	}
	
	onEnded() {
		this.props.onEnded();
	}

	render() {
		const { loop, source, activeSource } = this.props;
		const isActive = source === activeSource;
		return (
			<video
				ref={ this.onRef }
				className={
					classnames('banner__video', {
						'banner__video--active': isActive,
					})
				}
				autoPlay={ false }
				muted={ true }
				playsInline={ true }
				controls={ false }
				loop={ loop }
				onEnded={ this.onEnded }
			>
				<source src={ source } />
			</video>
		);
	}
}

export default branch({
	onEnded: 'onEnded',
	loop: 'loop',
	activeSource: 'source',
}, Video);