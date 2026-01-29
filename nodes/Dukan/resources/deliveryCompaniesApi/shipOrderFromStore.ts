import type { INodeProperties } from 'n8n-workflow';

const showOnlyForShipOrderFromStore = {
	operation: ['shipOrderFromStore'],
	resource: ['deliveryCompaniesApi'],
};

export const deliveryCompaniesApiShipOrderFromStoreDescription: INodeProperties[] = [
	{
		displayName: 'Order UID',
		name: 'orderUID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForShipOrderFromStore },
		description: 'The order UID to ship',
	},
	{
		displayName: 'Store Shipping Account ID',
		name: 'storeShippingCompanyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForShipOrderFromStore },
		description: "MongoDB ObjectId of the store's shipping account to use for shipping",
	},
];
