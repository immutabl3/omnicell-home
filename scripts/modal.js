import defer from 'lodash/defer';

const body = document.body;

const BODY_CLASS = 'modal-open';

export default function slideMenu({
	button,
	container,
	buttonClass,
	containerClass,
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

		buttonClass && button.classList.add(buttonClass);
		containerClass && container.classList.add(containerClass);
		container.setAttribute('aria-hidden', 'false');
		body.classList.add(BODY_CLASS);
		defer(() => document.addEventListener('click', clickOutside));
	};

	const deactivate = () => {
		if (!isActive) return;
		isActive = false;

		buttonClass && button.classList.remove(buttonClass);
		containerClass && container.classList.remove(containerClass);
		container.setAttribute('aria-hidden', 'true');
		body.classList.remove(BODY_CLASS);
		document.removeEventListener('click', clickOutside);
	};

	button.addEventListener('click', () => 
		isActive ? deactivate() : activate()
	);

	Array.from(container.querySelectorAll('[data-dismiss="modal"]'))
		.forEach(elem => elem.addEventListener('click', deactivate));
};