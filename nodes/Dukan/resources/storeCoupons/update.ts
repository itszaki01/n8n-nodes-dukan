import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreCouponsUpdate = {
	operation: ['update'],
	resource: ['storeCoupons'],
};

export const storeCouponsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		displayOptions: { show: showOnlyForStoreCouponsUpdate },
		default: '',
		required: true,
		description: "The coupon's ID (MongoDB ObjectId) to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreCouponsUpdate,
		},
		description: 'Whether to use JSON to define the payload',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsUpdate,
				useJson: [true],
			},
		},
		description:
			'JSON object. Optional fields: couponCode (string), promoType ("percentage"|"fixed-price"), value (number), allowExpiration (boolean), couponExipreAt (string), allowLimits (boolean), limit (number).',
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
							const cleanedBody = Object.fromEntries(
								Object.entries(parsedBody).filter(([, v]) => v !== ''),
							);
							requestOptions.body = cleanedBody;
						} catch {
							throw new Error('Invalid JSON provided in the JSON field');
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsUpdate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{
				displayName: 'Coupon Code',
				name: 'couponCode',
				type: 'string',
				default: '',
				description: 'Discount code (max 8 characters)',
				routing: {
					send: {
						type: 'body',
						property: 'couponCode',
						value: '={{$parameter.couponCode !== "" ? $parameter.couponCode : undefined}}',
					},
				},
			},
			{
				displayName: 'Promo Type',
				name: 'promoType',
				type: 'options',
				options: [
					{ name: 'Percentage', value: 'percentage' },
					{ name: 'Fixed Price', value: 'fixed-price' },
				],
				default: 'percentage',
				description: 'Type of promotion',
				routing: {
					send: {
						type: 'body',
						property: 'promoType',
					},
				},
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				default: 0,
				description: 'Discount value',
				routing: {
					send: {
						type: 'body',
						property: 'value',
						value: '={{$parameter.value}}',
					},
				},
			},
			{
				displayName: 'Allow Expiration',
				name: 'allowExpiration',
				type: 'boolean',
				default: true,
				description: 'Whether the coupon has an expiration date',
				routing: {
					send: {
						type: 'body',
						property: 'allowExpiration',
						value: '={{$parameter.allowExpiration}}',
					},
				},
			},
			{
				displayName: 'Coupon Expire At',
				name: 'couponExipreAt',
				type: 'string',
				default: '',
				description: 'Expiration date (e.g. ISO string)',
				routing: {
					send: {
						type: 'body',
						property: 'couponExipreAt',
						value: '={{$parameter.couponExipreAt !== "" ? $parameter.couponExipreAt : undefined}}',
					},
				},
			},
			{
				displayName: 'Allow Limits',
				name: 'allowLimits',
				type: 'boolean',
				default: true,
				description: 'Whether the coupon has a usage limit',
				routing: {
					send: {
						type: 'body',
						property: 'allowLimits',
						value: '={{$parameter.allowLimits}}',
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-limit
				description: 'Usage limit',
				routing: {
					send: {
						type: 'body',
						property: 'limit',
						value: '={{$parameter.limit}}',
					},
				},
			},
		],
	},
];
