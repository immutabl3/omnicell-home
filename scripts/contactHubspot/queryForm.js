import $ from '../utils/querySelector';

export default ({ id }) => {
	const [form] = $(`[data-form-id="${id}"]`);
	return form;
};
