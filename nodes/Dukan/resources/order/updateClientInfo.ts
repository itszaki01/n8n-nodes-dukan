import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForOrderUpdateClientInfo = {
	operation: ['updateClientInfo'],
	resource: ['order'],
};

export const orderUpdateClientInfoDescription: INodeProperties[] = [
	{
		displayName: 'Cart UID',
		name: 'cartId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForOrderUpdateClientInfo,
		},
		description: 'The cart ID to update client info',
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForOrderUpdateClientInfo,
		},
		description: 'Whether to use JSON to define the client info update data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdateClientInfo,
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
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'Type of shipping (required)',
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
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of the location (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'locationId',
				value: '={{$parameter.locationId !== "" ? $parameter.locationId : undefined}}',
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
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'ID of the stop desk (optional)',
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
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'City of the client (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'clientCity',
				value: '={{$parameter.clientCity !== "" ? $parameter.clientCity : undefined}}',
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
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of the sub location (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationId',
				value: '={{$parameter.subLocationId !== "" ? $parameter.subLocationId : undefined}}',
			},
		},
	},
	{
		displayName: 'Client Phone Number',
		name: 'clientPhoneNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'Phone number of the client (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'clientPhoneNumber',
				value: '={{$parameter.clientPhoneNumber !== "" ? $parameter.clientPhoneNumber : undefined}}',
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
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		description: 'Second phone number of the client (optional)',
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
		name: 'clientFullAdress',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdateClientInfo,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'Full address of the client (optional). Note: field name is "clientFullAdress" (not "clientFullAddress")',
		routing: {
			send: {
				type: 'body',
				property: 'clientFullAdress',
				value: '={{$parameter.clientFullAdress !== "" ? $parameter.clientFullAdress : undefined}}',
			},
		},
	},
	// {
	// 	displayName: 'Shipping Details',
	// 	name: 'shippingDetails',
	// 	type: 'json',
	// 	default: '[]',
	// 	displayOptions: {
	// 		show: {
	// 			...showOnlyForOrderUpdateClientInfo,
	// 			useJson: [false],
	// 		},
	// 	},
	// 	description: 'Array of shipping details. Each item should have fieldName, fieldValue, fieldType, and fieldId. (optional)',
	// 	routing: {
	// 		send: {
	// 			type: 'body',
	// 			property: 'shippingDetails',
	// 			value: '={{JSON.parse($parameter.shippingDetails)}}',
	// 		},
	// 	},
	// },
];
