import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForOrderUpdate = {
	operation: ['update'],
	resource: ['order'],
};

export const orderUpdateOrderDetailsDescription: INodeProperties[] = [
	{
		displayName: 'Cart ID',
		name: 'cartId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForOrderUpdate,
		},
		description: 'The cart ID to update',
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForOrderUpdate,
		},
		description: 'Whether to use JSON to define the update data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object containing order details to update. Only these fields are allowed: orderTracking (string, optional), totalProductsPrice (number, required), allowCustomTotalProductsPrice (boolean, optional), allowCustomShippingPrice (boolean, optional), shippingPrice (number, required). Other fields will be ignored.',
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
		displayName: 'Order Tracking',
		name: 'orderTracking',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdate,
				useJson: [false],
			},
		},
		description: 'Tracking number for the order (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'orderTracking',
			},
		},
	},

	{
		displayName: 'Allow Custom Total Products Price',
		name: 'allowCustomTotalProductsPrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForOrderUpdate,
				useJson: [false],
			},
		},
		description: 'Whether to allow custom total products price (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowCustomTotalProductsPrice',
			},
		},
	},
	{
		displayName: 'Total Products Price',
		name: 'totalProductsPrice',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForOrderUpdate,
				useJson: [false],
				allowCustomTotalProductsPrice: [true],
			},
		},
		description: 'Total price of products (required)',
		routing: {
			send: {
				type: 'body',
				property: 'totalProductsPrice',
			},
		},
	},
	{
		displayName: 'Allow Custom Shipping Price',
		name: 'allowCustomShippingPrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForOrderUpdate,
				useJson: [false],
			},
		},
		description: 'Whether to allow custom shipping price (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowCustomShippingPrice',
			},
		},
	},
	{
		displayName: 'Shipping Price',
		name: 'shippingPrice',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForOrderUpdate,
				useJson: [false],
				allowCustomShippingPrice: [true],
			},
		},
		description: 'Price of shipping (required)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingPrice',
			},
		},
	},
];
