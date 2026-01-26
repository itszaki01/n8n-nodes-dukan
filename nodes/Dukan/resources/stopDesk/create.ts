import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStopDeskCreate = {
	operation: ['create'],
	resource: ['stopDesk'],
};

export const stopDeskCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStopDeskCreate,
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
				...showOnlyForStopDeskCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing stop desk data. Required fields: stopDeskAddress, stopDeskShippingPrice, allowStopDeskShippingFakePrice, locationId. Optional fields: stopDeskId, allowDefualtShippingAccount, defualtShippingAccount, stopDeskShippingFakePrice, isActive.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => v !== ""))}}',
			},
		},
	},
	{
		displayName: 'Stop Desk Address',
		name: 'stopDeskAddress',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStopDeskCreate,
				useJson: [false],
			},
		},
		description: 'Stop desk address (required)',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskAddress',
			},
		},
	},
	{
		displayName: 'Stop Desk Shipping Price',
		name: 'stopDeskShippingPrice',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStopDeskCreate,
				useJson: [false],
			},
		},
		description: 'Shipping price for stop desk (required, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskShippingPrice',
			},
		},
	},
	{
		displayName: 'Allow Stop Desk Shipping Fake Price',
		name: 'allowStopDeskShippingFakePrice',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStopDeskCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow fake price for stop desk shipping (required)',
		routing: {
			send: {
				type: 'body',
				property: 'allowStopDeskShippingFakePrice',
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
				...showOnlyForStopDeskCreate,
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
		displayName: 'Stop Desk ID',
		name: 'stopDeskId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStopDeskCreate,
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
				...showOnlyForStopDeskCreate,
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
				...showOnlyForStopDeskCreate,
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
				...showOnlyForStopDeskCreate,
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
		default: true,
		displayOptions: {
			show: {
				...showOnlyForStopDeskCreate,
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
