import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCityDelete = {
	operation: ['delete'],
	resource: ['city'],
};

export const cityDeleteDescription: INodeProperties[] = [
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCityDelete,
		},
		description: "The city's MongoDB ObjectId to delete",
	},
];
