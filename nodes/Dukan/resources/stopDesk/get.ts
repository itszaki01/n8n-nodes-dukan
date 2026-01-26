import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStopDeskGetOne = {
	operation: ['getOne'],
	resource: ['stopDesk'],
};

export const stopDeskGetDescription: INodeProperties[] = [
	{
		displayName: 'Stop Desk ID',
		name: 'stopDeskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStopDeskGetOne,
		},
		description: "The stop desk's MongoDB ObjectId to retrieve",
	},
];
