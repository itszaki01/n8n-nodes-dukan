import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductDelete = {
	operation: ['delete'],
	resource: ['product'],
};

export const productDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForProductDelete,
		},
		description: "The product's MongoDB ObjectId to delete",
	},
];
