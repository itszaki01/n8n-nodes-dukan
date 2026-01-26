import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCityUpdate = {
	operation: ['update'],
	resource: ['city'],
};

export const cityUpdateDescription: INodeProperties[] = [
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCityUpdate,
		},
		description: "The city's MongoDB ObjectId to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForCityUpdate,
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
				...showOnlyForCityUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object containing city update data. All fields from UpdateStoreLocationSubDto are optional.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => { if (v === "") return false; if (Array.isArray(v) && v.length === 0) return false; if (typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v).length === 0) return false; return true; }))}}',
			},
		},
	},
	{
		displayName: 'City Name',
		name: 'subLocationName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForCityUpdate,
				useJson: [false],
			},
		},
		description: 'City name (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationName',
				value: '={{$parameter.subLocationName !== "" ? $parameter.subLocationName : undefined}}',
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
				...showOnlyForCityUpdate,
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
		default: false,
		displayOptions: {
			show: {
				...showOnlyForCityUpdate,
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
