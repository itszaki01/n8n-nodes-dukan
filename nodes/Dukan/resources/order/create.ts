import type { INodeProperties } from 'n8n-workflow';

const showOnlyForOrderCreate = {
	operation: ['create'],
	resource: ['order'],
};

export const orderCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForOrderCreate,
		},
		description: 'Whether to use JSON to define the order data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing order data. Only fields from CreateStoreOrderCartDto are allowed: subStore (string, required), clientName (string, required), shippingType (enum, required), orderedProducts (array, required), locationId, stopDeskId, totalProductsPrice, shippingDetails, allowCustomTotalProductsPrice, clientCity, subLocationId, clientSecondPhoneNumber, clientFullAddress, clientPhoneNumber, isFreeShipping, orderStatus (all optional). Fields like cartUID and coupon are excluded. Other fields will be ignored.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => v !== ""))}}',
			},
		},
	},
	{
		displayName: 'Client Name',
		name: 'clientName',
		type: 'string',
		default: '',

		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'Name of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientName',
				value: '={{$parameter.clientName !== "" ? $parameter.clientName : undefined}}',
			},
		},
	},
	{
		displayName: 'Client Phone Number',
		name: 'clientPhoneNumber',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'Phone number of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientPhoneNumber',
				value: '={{$parameter.clientPhoneNumber !== "" ? $parameter.clientPhoneNumber : undefined}}',
			},
		},
	},
	{
		displayName: 'Shipping Type',
		name: 'shippingType',
		type: 'options',
		options: [
			{
				name: 'للمنزل',
				value: 'للمنزل',
			},
			{
				name: 'لنقطة الإستلام',
				value: 'لنقطة الإستلام',
			},
		],
		default: 'للمنزل',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'Type of shipping',
		routing: {
			send: {
				type: 'body',
				property: 'shippingType',
			},
		},
	},
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of the location',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
				value: '={{$parameter.locationId !== "" ? $parameter.locationId : undefined}}',
			},
		},
	},
	{
		displayName: 'Sub Location ID',
		name: 'subLocationId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of the sub location',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationId',
				value: '={{$parameter.subLocationId !== "" ? $parameter.subLocationId : undefined}}',
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
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'ID of the stop desk',
		routing: {
			send: {
				type: 'body',
				property: 'stopDeskId',
				value: '={{$parameter.stopDeskId !== "" ? $parameter.stopDeskId : undefined}}',
			},
		},
	},
	{
		displayName: 'Client City',
		name: 'clientCity',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'City of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientCity',
				value: '={{$parameter.clientCity !== "" ? $parameter.clientCity : undefined}}',
			},
		},
	},
	{
		displayName: 'Client Second Phone Number',
		name: 'clientSecondPhoneNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'Second phone number of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientSecondPhoneNumber',
				value: '={{$parameter.clientSecondPhoneNumber !== "" ? $parameter.clientSecondPhoneNumber : undefined}}',
			},
		},
	},
	{
		displayName: 'Client Full Address',
		name: 'clientFullAddress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'Full address of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientFullAddress',
				value: '={{$parameter.clientFullAddress !== "" ? $parameter.clientFullAddress : undefined}}',
			},
		},
	},
	{
		displayName: 'Shipping Details',
		name: 'shippingDetails',
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		description: 'Array of shipping details. Each item should have fieldName, fieldValue, fieldType, and fieldId.',
		routing: {
			send: {
				type: 'body',
				property: 'shippingDetails',
				value: '={{JSON.parse($parameter.shippingDetails)}}',
			},
		},
	},
	{
		displayName: 'Ordered Products',
		name: 'orderedProducts',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'Array of ordered products. Each product should have: productId (string), totalProductPrice (number), totalProductFees (number, optional), quentity (number), propertiesSelected (array, optional), colorsSelected (array, optional), offerId (string, optional)',
		routing: {
			send: {
				type: 'body',
				property: 'orderedProducts',
				value: '={{JSON.parse($parameter.orderedProducts)}}',
			},
		},
	},
];
