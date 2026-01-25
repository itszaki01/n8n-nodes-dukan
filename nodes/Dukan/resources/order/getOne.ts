import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserGetOne = {
	operation: ['getOne'],
	resource: ['order'],
};

export const orderGetOneDescription: INodeProperties[] = [
	{
		displayName: 'Order UID',
		name: 'orderUid',
		type: 'string',
		displayOptions: { show: showOnlyForUserGetOne },
		default: '',
		required:true,
		description: "The order's UID to retrieve",
	},
];
