import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDeleteColi = {
	operation: ['deleteColi'],
	resource: ['deliveryCompaniesApi'],
};

export const deliveryCompaniesApiDeleteColiDescription: INodeProperties[] = [
	{
		displayName: 'Order UID',
		name: 'orderUID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForDeleteColi },
		description: 'The order UID to delete the coli/shipment for',
	},
];
