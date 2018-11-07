import React, { memo } from 'react';
import range from 'lodash/range';

const renderCircle = function(index) {
	return (
		<div key={ index } className="circle">
			<div className="inner" />
		</div>
	);
};

export default memo(function Spinner() {
	return (
		<div className="spinner">
			{ range(5).map(renderCircle) }
		</div>
	);
});