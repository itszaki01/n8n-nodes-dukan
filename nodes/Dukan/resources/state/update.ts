import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStateUpdate = {
	operation: ['update'],
	resource: ['state'],
};

export const stateUpdateDescription: INodeProperties[] = [
	{
		displayName: 'State ID',
		name: 'stateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStateUpdate,
		},
		description: "The state's MongoDB ObjectId to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStateUpdate,
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
				...showOnlyForStateUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object containing state update data. All fields from UpdateStoreLocationDto are optional.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => { if (v === "") return false; if (Array.isArray(v) && v.length === 0) return false; if (typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v).length === 0) return false; return true; }))}}',
			},
		},
	},
	{
		displayName: 'State Name',
		name: 'locationName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStateUpdate,
				useJson: [false],
			},
		},
		description: 'State name (optional, max 50 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'locationName',
				value: '={{$parameter.locationName !== "" ? $parameter.locationName : undefined}}',
			},
		},
	},
	{
		displayName: 'Shipping To Home Price',
		name: 'shippingToHomePrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStateUpdate,
				useJson: [false],
			},
		},
		description: 'Shipping price to home (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingToHomePrice',
				value: '={{$parameter.shippingToHomePrice !== undefined && $parameter.shippingToHomePrice >= 0 ? $parameter.shippingToHomePrice : undefined}}',
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
				...showOnlyForStateUpdate,
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
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStateUpdate,
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
				...showOnlyForStateUpdate,
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
				...showOnlyForStateUpdate,
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
				...showOnlyForStateUpdate,
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
				...showOnlyForStateUpdate,
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
	{
		displayName: 'Allow Shipping For Stop Desks Only',
		name: 'allowShippingForStopDesksOnly',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStateUpdate,
				useJson: [false],
			},
		},
		description: 'Whether to allow shipping for stop desks only (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowShippingForStopDesksOnly',
			},
		},
	},
];
