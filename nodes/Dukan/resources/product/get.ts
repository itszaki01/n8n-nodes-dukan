import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductGet = {
	operation: ['get'],
	resource: ['product'],
};

export const productGetDescription: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		displayOptions: { show: showOnlyForProductGet },
		default: '',
		description: "The product's ID to retrieve",
	},
];
