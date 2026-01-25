import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductCreate = {
	operation: ['create'],
	resource: ['product'],
};

export const productCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForProductCreate,
		},
		description: 'The name of the product',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
];
