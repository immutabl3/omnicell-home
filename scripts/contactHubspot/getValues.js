import $ from '../utils/querySelector';

const emailSalesData = $('#emailSalesData');

export default () => JSON.parse(emailSalesData.innerHTML);