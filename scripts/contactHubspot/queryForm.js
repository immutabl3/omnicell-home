export default ({ id }) => {
	return document.querySelector(`[data-form-id="${id}"]`);
};
