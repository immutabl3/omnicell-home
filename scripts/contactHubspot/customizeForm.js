import $ from '../utils/querySelector';
import getValues from './getValues';

export default form => {
	const [productSelect] = $('select[name="product"]', form);
	
	// populate the form
	const values = getValues();
	values.forEach(value => {
		const option = document.createElement('option');
		option.value = value;
		option.innerText = value;
		productSelect.appendChild(option);
	});

	// sync this input with the select
	const [productInput] = $('input[name="product_text_box"]', form);
	productSelect.addEventListener('input', function() {
		productInput.value = productSelect.value;
	});

	return form;
};
