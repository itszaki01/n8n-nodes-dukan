import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStateCreate = {
	operation: ['create'],
	resource: ['state'],
};

export const stateCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStateCreate,
		},
		description: 'Whether to use JSON to define the state data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing state data. Required fields: locationName, shippingToHomePrice. Optional fields: locationCustomId, isActive, allowShippingToHomeFakePrice, shippingToHomeFakePrice, allowDefualtShippingAccount, defualtShippingAccount.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => v !== ""))}}',
			},
		},
	},
	{
		displayName: 'State Name',
		name: 'locationName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'State name (required, max 50 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'locationName',
			},
		},
	},
	{
		displayName: 'Shipping To Home Price',
		name: 'shippingToHomePrice',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Shipping price to home (required, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingToHomePrice',
			},
		},
	},
	{
		displayName: 'State Custom ID',
		name: 'locationCustomId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Custom ID for the state (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'locationCustomId',
				value: '={{$parameter.locationCustomId !== "" ? $parameter.locationCustomId : undefined}}',
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
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Whether the state is active (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isActive',
			},
		},
	},
	{
		displayName: 'Allow Shipping To Home Fake Price',
		name: 'allowShippingToHomeFakePrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow fake price for shipping to home (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowShippingToHomeFakePrice',
			},
		},
	},
	{
		displayName: 'Shipping To Home Fake Price',
		name: 'shippingToHomeFakePrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
				allowShippingToHomeFakePrice: [true],
			},
		},
		description: 'Fake price for shipping to home (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingToHomeFakePrice',
				value: '={{$parameter.shippingToHomeFakePrice !== undefined ? $parameter.shippingToHomeFakePrice : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Default Shipping Account',
		name: 'allowDefualtShippingAccount',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow default shipping account (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowDefualtShippingAccount',
			},
		},
	},
	{
		displayName: 'Default Shipping Account',
		name: 'defualtShippingAccount',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
				allowDefualtShippingAccount: [true],
			},
		},
		description: 'MongoDB ObjectId of default shipping account (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'defualtShippingAccount',
				value: '={{$parameter.defualtShippingAccount !== "" ? $parameter.defualtShippingAccount : undefined}}',
			},
		},
	},
];
