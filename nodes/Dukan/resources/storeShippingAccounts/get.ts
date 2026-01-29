import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreShippingAccountsGetOne = {
	operation: ['getOne'],
	resource: ['storeShippingAccounts'],
};

export const storeShippingAccountsGetDescription: INodeProperties[] = [
	{
		displayName: 'Shipping Account ID',
		name: 'shippingCompanyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStoreShippingAccountsGetOne,
		},
		description: "The store shipping account's MongoDB ObjectId to retrieve",
	},
];
