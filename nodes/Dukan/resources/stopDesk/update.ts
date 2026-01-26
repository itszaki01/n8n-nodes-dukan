import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStopDeskUpdate = {
	operation: ['update'],
	resource: ['stopDesk'],
};

export const stopDeskUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Stop Desk ID',
		name: 'stopDeskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStopDeskUpdate,
		},
		description: "The stop desk's MongoDB ObjectId to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStopDeskUpdate,
		},
		description: 'Whether to use JSON to define the stop desk data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object containing stop desk update data. All fields from UpdateStoreLocationStopDeskDto are optional.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => { if (v === "") return false; if (Array.isArray(v) && v.length === 0) return false; if (typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v).length === 0) return false; return true; }))}}',
			},
		},
	},
	{
		displayName: 'Stop Desk Address',
		name: 'stopDeskAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [false],
			},
		},
		description: 'Stop desk address (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskAddress',
				value: '={{$parameter.stopDeskAddress !== "" ? $parameter.stopDeskAddress : undefined}}',
			},
		},
	},
	{
		displayName: 'Stop Desk Shipping Price',
		name: 'stopDeskShippingPrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [false],
			},
		},
		description: 'Shipping price for stop desk (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskShippingPrice',
				value: '={{$parameter.stopDeskShippingPrice !== undefined && $parameter.stopDeskShippingPrice >= 0 ? $parameter.stopDeskShippingPrice : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Stop Desk Shipping Fake Price',
		name: 'allowStopDeskShippingFakePrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [false],
			},
		},
		description: 'Whether to allow fake price for stop desk shipping (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowStopDeskShippingFakePrice',
			},
		},
	},
	{
		displayName: 'Stop Desk ID',
		name: 'stopDeskId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [false],
			},
		},
		description: 'Custom ID for the stop desk (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskId',
				value: '={{$parameter.stopDeskId !== "" ? $parameter.stopDeskId : undefined}}',
			},
		},
	},
	{
		displayName: 'Stop Desk Shipping Fake Price',
		name: 'stopDeskShippingFakePrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [false],
			},
		},
		description: 'Fake price for stop desk shipping (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskShippingFakePrice',
				value: '={{$parameter.stopDeskShippingFakePrice !== undefined ? $parameter.stopDeskShippingFakePrice : undefined}}',
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
				...showOnlyForStopDeskUpdate,
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
				...showOnlyForStopDeskUpdate,
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
		displayName: 'Is Active',
		name: 'isActive',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStopDeskUpdate,
				useJson: [false],
			},
		},
		description: 'Whether the stop desk is active (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isActive',
			},
		},
	},
];
