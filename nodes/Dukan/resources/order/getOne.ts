import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserGetOne = {
	operation: ['getOne'],
	resource: ['order'],
};

export const orderGetOneDescription: INodeProperties[] = [
	{
		displayName: 'Cart UID',
		name: 'cartUid',
		type: 'string',
		displayOptions: { show: showOnlyForUserGetOne },
		default: '',
		required:true,
		description: "The cart's UID to retrieve",
	},
];
