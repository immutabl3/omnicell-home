import $ from '../utils/querySelector';
import defer from 'lodash/defer';
import noop from 'lodash/noop';

const body = document.body;

const BODY_CLASS = 'imm-modal-open';

export default function modal({
	button,
	container,
	buttonClass,
	containerClass,
	preActivate = noop,
	postActivate = noop,
	preDeactivate = noop,
	postDeactivate = noop,
}) {
	let isActive = false;

	const [child] = container.children;

	const clickOutside = e => {
		const isClickInside = isActive && child && child.contains(e.target);
		if (isClickInside) return;
		// the click was outside the menu, close
		deactivate(); // eslint-disable-line
	};

	const activate = () => {
		if (isActive) return;
		isActive = true;

		preActivate();
		buttonClass && button.classList.add(buttonClass);
		containerClass && container.classList.add(containerClass);
		$.attr(container, 'aria-hidden', 'false');
		body.classList.add(BODY_CLASS);
		postActivate();
		defer(() => document.addEventListener('click', clickOutside));
	};

	const deactivate = () => {
		if (!isActive) return;
		isActive = false;

		preDeactivate();
		buttonClass && button.classList.remove(buttonClass);
		containerClass && container.classList.remove(containerClass);
		$.attr(container, 'aria-hidden', 'true');
		body.classList.remove(BODY_CLASS);
		document.removeEventListener('click', clickOutside);
		postDeactivate();
	};

	button.addEventListener('click', () => 
		isActive ? deactivate() : activate()
	);

	$('[data-dismiss="modal"]', container)
		.forEach(elem => elem.addEventListener('click', deactivate));
};