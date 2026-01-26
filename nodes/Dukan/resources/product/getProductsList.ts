import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductGetProductsList = {
	operation: ['getProductsList'],
	resource: ['product'],
};

export const productGetProductsListDescription: INodeProperties[] = [
	{
		displayName: 'Store ID',
		name: 'storeId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForProductGetProductsList,
		},
		description: 'MongoDB ObjectId of the store to get products list',
	},
];
