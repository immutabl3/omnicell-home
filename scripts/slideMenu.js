import defer from 'lodash/defer';
import noop from 'lodash/noop';

export default function slideMenu({
	button,
	container,
	buttonClass,
	containerClass,
	postActivate = noop,
	preDeactivate = noop,
}) {
	let isActive = false;

	const clickOutside = e => {
		const isClickInside = isActive && container.contains(e.target);
		if (isClickInside) return;
		// the click was outside the menu, close
		deactivate(); // eslint-disable-line
	};

	const activate = () => {
		if (isActive) return;
		isActive = true;

		buttonClass && button.classList.add(buttonClass);
		containerClass && container.classList.add(containerClass);
		container.setAttribute('aria-hidden', 'false');
		postActivate();
		defer(() => document.addEventListener('click', clickOutside));
	};

	const deactivate = () => {
		if (!isActive) return;
		isActive = false;

		preDeactivate();
		buttonClass && button.classList.remove(buttonClass);
		containerClass && container.classList.remove(containerClass);
		container.setAttribute('aria-hidden', 'true');
		document.removeEventListener('click', clickOutside);
	};

	button.addEventListener('click', () => 
		isActive ? deactivate() : activate()
	);
};