import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCityCreate = {
	operation: ['create'],
	resource: ['city'],
};

export const cityCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForCityCreate,
		},
		description: 'Whether to use JSON to define the city data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForCityCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing city data. Required fields: subLocationName, locationId. Optional fields: isActive, subLocationCustomId.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => v !== ""))}}',
			},
		},
	},
	{
		displayName: 'City Name',
		name: 'subLocationName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForCityCreate,
				useJson: [false],
			},
		},
		description: 'City name (required)',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationName',
			},
		},
	},
	{
		displayName: 'State ID',
		name: 'locationId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForCityCreate,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of the parent state (required)',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
			},
		},
	},
	{
		displayName: 'City Custom ID',
		name: 'subLocationCustomId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForCityCreate,
				useJson: [false],
			},
		},
		description: 'Custom ID for the city (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationCustomId',
				value: '={{$parameter.subLocationCustomId !== "" ? $parameter.subLocationCustomId : undefined}}',
			},
		},
	},
	{
		displayName: 'Is Active',
		name: 'isActive',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				...showOnlyForCityCreate,
				useJson: [false],
			},
		},
		description: 'Whether the city is active (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isActive',
			},
		},
	},
];
