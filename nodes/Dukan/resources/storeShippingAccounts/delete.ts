import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreShippingAccountsDelete = {
	operation: ['delete'],
	resource: ['storeShippingAccounts'],
};

export const storeShippingAccountsDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Shipping Account ID',
		name: 'shippingCompanyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStoreShippingAccountsDelete,
		},
		description: "The store shipping account's MongoDB ObjectId to delete",
	},
];
