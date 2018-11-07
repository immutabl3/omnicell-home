import getValues from './getValues';

export default form => {
	const productSelect = form.querySelector('select[name="product"]');
	// populate the form
	const values = getValues();
	values.forEach(value => {
		const option = document.createElement('option');
		option.value = value;
		option.innerText = value;
		productSelect.appendChild(option);
	});

	const productInput = form.querySelector('input[name="product_text_box"]');
	productSelect.addEventListener('input', function() {
		productInput.value = productSelect.value;
	});

	return form;
};
