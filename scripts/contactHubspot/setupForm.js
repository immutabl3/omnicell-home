const emailSalesModal = document.querySelector('#emailSalesModal');

export default hbspt => {
	const portalId = emailSalesModal.getAttribute('data-portalId');
	const formId = emailSalesModal.getAttribute('data-formId');
	const sfdcCampaignId = emailSalesModal.getAttribute('data-sfdcCampaignId');
	
	// create the hubspot form
	return new Promise(function(resolve) {
		const form = hbspt.forms.create({
			portalId,
			formId,
			sfdcCampaignId,
			onFormSubmit() {
				location.reload();
			} 	
		});

		form.onReady(() => resolve(form));
	});
};
