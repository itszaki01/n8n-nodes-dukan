import type { INodeProperties } from 'n8n-workflow';

const showOnlyForShipAllStoreOrders = {
	operation: ['shipAllStoreOrders'],
	resource: ['deliveryCompaniesApi'],
};

export const deliveryCompaniesApiShipAllStoreOrdersDescription: INodeProperties[] = [
	{
		displayName: 'Store Shipping Account ID',
		name: 'storeShippingCompanyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForShipAllStoreOrders },
		description: "MongoDB ObjectId of the store's shipping account. All confirmed orders will be shipped with this account.",
	},
];
