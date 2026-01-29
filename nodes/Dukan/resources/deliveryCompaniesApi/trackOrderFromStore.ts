import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTrackOrderFromStore = {
	operation: ['trackOrderFromStore'],
	resource: ['deliveryCompaniesApi'],
};

export const deliveryCompaniesApiTrackOrderFromStoreDescription: INodeProperties[] = [
	{
		displayName: 'Order UID',
		name: 'orderUID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForTrackOrderFromStore },
		description: 'The order UID to track',
	},
];
