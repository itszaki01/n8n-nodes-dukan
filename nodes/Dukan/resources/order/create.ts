import type { INodeProperties } from 'n8n-workflow';

const showOnlyForOrderCreate = {
	operation: ['create'],
	resource: ['order'],
};

export const orderCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForOrderCreate,
		},
		description: 'The name of the order',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
];
