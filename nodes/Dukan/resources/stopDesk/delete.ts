import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStopDeskDelete = {
	operation: ['delete'],
	resource: ['stopDesk'],
};

export const stopDeskDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Stop Desk ID',
		name: 'stopDeskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStopDeskDelete,
		},
		description: "The stop desk's MongoDB ObjectId to delete",
	},
];
