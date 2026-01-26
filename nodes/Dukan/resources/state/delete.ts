import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStateDelete = {
	operation: ['delete'],
	resource: ['state'],
};

export const stateDeleteDescription: INodeProperties[] = [
	{
		displayName: 'State ID',
		name: 'stateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStateDelete,
		},
		description: "The state's MongoDB ObjectId to delete",
	},
];
