import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStateGetOne = {
	operation: ['getOne'],
	resource: ['state'],
};

export const stateGetDescription: INodeProperties[] = [
	{
		displayName: 'State ID',
		name: 'stateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStateGetOne,
		},
		description: "The state's MongoDB ObjectId to retrieve",
	},
];
