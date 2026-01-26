import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCityGetOne = {
	operation: ['getOne'],
	resource: ['city'],
};

export const cityGetDescription: INodeProperties[] = [
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCityGetOne,
		},
		description: "The city's MongoDB ObjectId to retrieve",
	},
];
