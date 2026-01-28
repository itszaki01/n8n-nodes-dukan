import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

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
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForOrderCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing product data. See ProductDto.ts for complete structure.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{JSON.parse($parameter.json)}}',
				preSend: [
					async function (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const jsonString = this.getNodeParameter('json', '{}') as string;
						try {
							const parsedBody = JSON.parse(jsonString);

							// Optional: Clean empty strings from top-level
							const cleanedBody = Object.fromEntries(
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								Object.entries(parsedBody).filter(([_, v]) => v !== "")
							);

							requestOptions.body = cleanedBody;
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
						} catch (error) {
							throw new Error('Invalid JSON provided in the JSON field');
						}
						return requestOptions;
					},
				],
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
