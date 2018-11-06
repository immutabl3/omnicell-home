import React, { PureComponent } from 'react';
import range from 'lodash/range';
import { BLUR_MAX } from './config.json';

// only renders once
export default class Blurs extends PureComponent {
	render() {
		return (
			<svg className="visuallyhidden">
				<defs>
					{
						range(BLUR_MAX)
							.map(idx => {
								const inc = idx + 1;
								return (
									<filter key={ idx } id={ `blur${inc}` }>
										<feGaussianBlur
											in="SourceGraphic"
											stdDeviation={ `${inc},0` }
										/>
									</filter>
								);
							})
					}
				</defs>
			</svg>
		);
	}
};